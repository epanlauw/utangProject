import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource, Capacitor } from '@capacitor/core';
import { LoadingController, Platform } from '@ionic/angular';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef<HTMLInputElement>;
  photo: SafeResourceUrl;
  isDesktop: boolean;
  form: FormGroup;
  imageUrl: string = '';
  user: any;
  types: any;
  recipe: any;
  id:any;

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

  errors_message = {
    'photo': []
  }

  constructor(
    private router: Router, 
    private recipeSrv: RecipeService,
    private platform: Platform,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    if((this.platform.is('mobile') && this.platform.is('hybrid')) || 
    this.platform.is('desktop')){
      this.isDesktop = true;
    }

    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('idDetail')) {return;}
      this.id = paramMap.get('idDetail');
      console.log(this.id);
    });

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
      difficulty: new FormControl('', Validators.compose([
        Validators.required
      ])),
      image_url: new FormControl(null)
    });
  }

  ionViewWillEnter() {
    this.showRecipe();
  }

  async onSubmit(value) {
    const loading = await this.presentLoading();
    const data = {
      name : value.nama,
      ingredient : value.bahan,
      steps : value.langkah,
      imageUrl : this.imageUrl,
      difficulty : value.difficulty,
    }

    console.log(data);

    this.recipeSrv.editRecipe(data, this.id).then(res => {
      res.subscribe((data:any) => {
        console.log(data);
        loading.dismiss();
        this.router.navigate(['/detail/', this.id]);
      });
    })
  }

  async showRecipe() {
    const loading = await this.presentLoading();

    this.recipeSrv.getRecipeDetail(this.id).then(res => {
      res.subscribe((data:any) => {
        loading.dismiss();
        this.recipe = data.data.recipe;
        console.log(this.recipe);
        this.imageUrl = this.recipe.image_url;
        this.form.setValue({
          nama: this.recipe.name, 
          bahan: this.recipe.ingredient,
          langkah: this.recipe.steps,
          difficulty: this.recipe.difficulty
        });
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
