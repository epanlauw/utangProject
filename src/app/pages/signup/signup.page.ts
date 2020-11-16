import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onSubmit(f: NgForm) {
    this.router.navigateByUrl("home");
  }
}
