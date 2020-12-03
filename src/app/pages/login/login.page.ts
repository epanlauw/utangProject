import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {


  constructor(
    private router: Router,
    private userSrv: UserService,
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    //console.log(form);
    const user = {
      email: form.value.email,
      password: form.value.password
    }

    this.userSrv.loginUser(user).subscribe(res => {
      console.log(res);
    })
    this.router.navigateByUrl("home");
  }
}
