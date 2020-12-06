import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from "@angular/router";
import { Camera, CameraResultType, CameraSource, Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';

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
      { type: 'minLength', message: 'Password must be at least 6 characters long.'}
    ],
    'dob': [
      { type: 'required', message: 'Tanggal Lahir is required'},
    ]
  }
  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private platform: Platform,
    private formBuilder: FormBuilder
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
      gender: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dob: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  registerUser(value) {
    console.log(value);
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
    console.log(this.photo);
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
