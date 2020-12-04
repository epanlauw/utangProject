import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    email: [
      {type:'required', message:'Email is required.'},
      {type:'pattern', message:'Enter a valid email.'}
    ],
    password: [
      {type:'required', message: 'Password is required.'},
      {type:'minlength', message: 'Password must be at least 6 characters.'}
    ]
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authSrv: AuthService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });
  }

  loginUser(value) {
    this.authSrv.loginUser(value).subscribe(res => {
      console.log(res);
    }, err => 
    console.log(err)
    );
  }
}
