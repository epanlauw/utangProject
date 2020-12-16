import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { RecipeService } from 'src/app/services/recipe.service';
import { Camera , CameraResultType, CameraSource, Capacitor} from '@capacitor/core'
import { AuthService } from 'src/app/services/auth.service';

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
  imageUrl: string = '';
  user: any;
  types: any;

  validation_message = {
    'nama': [
      { type: 'required', message: 'Nama Resep is required'},
    ],
    'bahan': [
      { type: 'required', message: 'Bahan-Bahan is required'},
    ],
    'langkah': [
      { type: 'required', message: 'Langkah-Langkah is required'},
    ],
    'type': [
      { type: 'required', message: 'Tipe is required'},
    ],
    'difficulty': [
      { type: 'required', message: 'Tingkat Kesulitan is required'},
    ]
  }

  constructor(
    private router: Router, 
    private recipeSrv: RecipeService,
    private platform: Platform,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private authSrv: AuthService,
    private loadingCtrl: LoadingController
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
      type: new FormControl('', Validators.compose([
        Validators.required
      ])),
      difficulty: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });

    this.showUser();
  }

  async onSubmit(value) {
    const loading = await this.presentLoading();
    const data = {
      name : value.nama,
      ingredient : value.bahan,
      steps : value.langkah,
      imageUrl : this.imageUrl,
      difficulty : value.difficulty,
      id_user : this.user.id,
      id_type : value.type
    }

    this.recipeSrv.insertRecipe(data).then(res => {
      res.subscribe((data:any) => {
        loading.dismiss();
        console.log(data);
        this.router.navigateByUrl('/home');
      },err => {
        loading.dismiss();
        console.log(err);
      });
    });

    this.form.reset();
    this.imageUrl = '';
  }

  async showUser() {
    const loading = await this.presentLoading();
    this.authSrv.getUser().then(res => {
      res.subscribe((data:any) => {
        loading.dismiss();
        this.user = data.data.user;
        this.showType();
        console.log(this.user);
      })
    });
  }

  async showType() {
    this.recipeSrv.getAllType().then(res => {
      res.subscribe((data:any) => {
        console.log(data);
        this.types = data.data.type;
      });
    });
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });

    loading.present();
    return loading;
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
    this.imageUrl = image.dataUrl;
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
