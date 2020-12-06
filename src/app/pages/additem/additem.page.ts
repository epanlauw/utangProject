import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { RecipeService } from 'src/app/services/recipe.service';
import { Camera , CameraResultType, CameraSource, Capacitor} from '@capacitor/core'

@Component({
  selector: 'app-additem',
  templateUrl: './additem.page.html',
  styleUrls: ['./additem.page.scss'],
})
export class AdditemPage implements OnInit {

  
  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef<HTMLInputElement>;
  photo: SafeResourceUrl;
  isDesktop: boolean;
  form: FormGroup;

  validation_message = {
    'nama': [
      { type: 'required', message: 'Recipe Title is required'},
    ],
    'bahan': [
      { type: 'required', message: 'Bahan-Bahan is required'},
    ],
    'langkah': [
      { type: 'required', message: 'Langkah-Langkah is required'},
    ],
    'url': [
      { type: 'required', message: 'URL is required'},
    ]
  }

  constructor(
    private router: Router, 
    private recSrv: RecipeService,
    private platform: Platform,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    if((this.platform.is('mobile') && this.platform.is('hybrid')) || 
    this.platform.is('desktop')){
      this.isDesktop = true;
    }

    this.form = this.formBuilder.group({
      nama: new FormControl('', Validators.compose([
        Validators.required
      ])),
      bahan: new FormControl('', Validators.compose([
        Validators.required
      ])),
      langkah: new FormControl('', Validators.compose([
        Validators.required
      ])),
      url: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  onSubmit(value){
    console.log(value);
    const data = {
      nama : value.nama,
      bahan : value.bahan,
      langkah : value.langkah,
      url : value.url,
      imageUrl : this.photo
    }
    console.log(data);
    this.recSrv.insertRecipe(data);
    this.form.reset();
    this.router.navigateByUrl('/home');
  }

  async getPicture(type: string){
    if(!Capacitor.isPluginAvailable('Camera') || (this.isDesktop && type === 'gallery')){
      this.filePickerRef.nativeElement.click();
      return;
    }
    const image = await Camera.getPhoto({
      quality: 100,
      width: 400,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  onFileChoose(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    const pattern = /image-*/;
    const reader = new FileReader();

    if(!file.type.match(pattern)){
      console.log('File Format not supported');
      return;
    }

    reader.onload = () => {
      this.photo = reader.result.toString();
    };
    reader.readAsDataURL(file);
  }

}
