import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource, Capacitor } from '@capacitor/core';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  @ViewChild('filePicker', {static: false}) filePickerRef: ElementRef<HTMLInputElement>;
  user:any = "";
  form: FormGroup;
  photo: SafeResourceUrl;
  imageUrl: string = '';
  isDesktop: boolean;

  validation_message = {
    'first_name': [
      {type: 'required', message: 'Nama Depan is required'}
    ],
    'dob': [
      { type: 'required', message: 'Date of Birth is required'},
    ]
  }
  
  constructor(
    private authSrv: AuthService,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private platform: Platform,
    private router: Router,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    if((this.platform.is('mobile') && this.platform.is('hybrid')) || this.platform.is('desktop')) {
      this.isDesktop = true;
    }
    this.showUser();
    this.form = this.formBuilder.group({
      first_name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      last_name: new FormControl(null),
      email: new FormControl(null),
      gender: new FormControl('', Validators.compose([
        Validators.required
      ])),
      dob: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  async editUser(value) {
    const loading = await this.presentLoading();

    const user = {
      first_name: value.first_name,
      last_name: value.last_name != null? value.last_name : '',
      email: value.email,
      gender: value.gender,
      date_of_birth: value.dob,
      avatar_url: this.imageUrl
    }

    this.authSrv.editUser(user).then(res => {
      res.subscribe((data:any) => {
        loading.dismiss();
        console.log(data);
        this.router.navigateByUrl("profile");
        this.presentToast();
      });
    });
  }

  async showUser() {
    const loading =  await this.presentLoading();

    this.authSrv.getUser().then(res => {
      res.subscribe((data:any) => {
        loading.dismiss();
        this.user = data.data.user;
        console.log(this.user);
        this.imageUrl = this.user.avatar_url;
      })
    });
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });

    loading.present();
    return loading;
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Edit Profile Success',
      duration: 2000
    });
    toast.present();
  }

  async getPicture(type: string) {
    if(!Capacitor.isPluginAvailable('Camera') || (this.isDesktop && type === 'gallery')) {
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

  onFileChoose(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const pattern = /image-*/;
    const reader = new FileReader();

    if(!file.type.match(pattern)) {
      console.log('File format not supported');
      return;
    }

    reader.onload = () => {
      this.photo = reader.result.toString();
    }
    reader.readAsDataURL(file);
  }
}
