import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from "@angular/router";
import { Camera, CameraResultType, CameraSource, Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
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
  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private platform: Platform,
    private formBuilder: FormBuilder,
    private authSrv: AuthService
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
      ]))
    });
  }

  registerUser(value) {
    this.gender =   value.gender[0].toUpperCase() + value.gender.slice(1);
    const user = {
      first_name: value.first_name,
      last_name: value.last_name? value.last_name : '',
      email: value.email,
      password: value.password,
      gender: this.gender,
      date_of_birth: value.dob,
      avatar_url: this.imageUrl
    }
    
    this.authSrv.registerUser(user).subscribe(res => {
      console.log(res);
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
