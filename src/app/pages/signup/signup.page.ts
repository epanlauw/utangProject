import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from "@angular/router";
import { Camera, CameraResultType, CameraSource, Capacitor } from '@capacitor/core';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {
  @ViewChild('filePicker', {static: false}) filePickerRef: ElementRef<HTMLInputElement>;
  form: FormGroup;
  photo: SafeResourceUrl;

  isDesktop: boolean;
  errorMessage: string = '';
  successMessage: string = '';
  gender: string = '';
  imageUrl: string = '';
  lastName: string = '';

  validation_message = {
    'first_name': [
      { type: 'required', message: 'Nama Depan is required'},
    ],
    'email': [
      { type: 'required', message: 'Email is required'},
      { type: 'pattern', message: 'Enter a valid email.'}
    ],
    'password': [
      { type: 'required', message: 'Password is required'},
      { type: 'minlength', message: 'Password must be at least 6 characters long.'}
    ],
    'gender': [
      { type: 'required', message: 'Gender is required'},
    ],
    'dob': [
      { type: 'required', message: 'Date of Birth is required'},
    ]
  }

  errors_message = {
    'first_name': [],
    'email': [],
    'password': [],
    'gender': [],
    'date_of_birth': [],
    'photo': []
  }
  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private platform: Platform,
    private formBuilder: FormBuilder,
    private authSrv: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    if((this.platform.is('mobile') && this.platform.is('hybrid')) || this.platform.is('desktop')) {
      this.isDesktop = true;
    }

    this.form = this.formBuilder.group({
      first_name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      last_name: new FormControl(null),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      gender: new FormControl('', Validators.compose([
        Validators.required
      ])),
      dob: new FormControl('', Validators.compose([
        Validators.required
      ])),
      avatar_url: new FormControl(null)
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
      message: 'Sign Up Success',
      duration: 2000
    });
    toast.present();
  }

  async registerUser(value) {
    const loading = await this.presentLoading();

    //this.gender =   value.gender[0].toUpperCase() + value.gender.slice(1);
    const user = {
      first_name: value.first_name,
      last_name: value.last_name != null? value.last_name : this.lastName,
      email: value.email,
      password: value.password,
      gender: value.gender,
      date_of_birth: value.dob,
      avatar_url: this.imageUrl
    }
        
    this.authSrv.registerUser(user).subscribe(res => {
      console.log(res);
      loading.dismiss();
      this.router.navigateByUrl("home");
      this.presentToast();
    }, err => {
      //console.log(err.error.data);
      const error =  err.error.data;
      if(error.first_name) {
        this.errors_message.first_name = error.first_name;
      } 

      if(error.email) {
        this.errors_message.email = error.email;
      }

      if(error.password) {
        this.errors_message.password = error.password;
      }

      if(error.gender) {
        this.errors_message.gender = error.gender;
      }

      if(error.date_of_birth) {
        this.errors_message.date_of_birth = error.date_of_birth;
      }

      if(error.avatar_url) {
        this.errors_message.photo = ["Required Photo"];
      }

      console.log(this.errors_message);
      loading.dismiss();
    });
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
