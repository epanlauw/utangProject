import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.page.html',
  styleUrls: ['./additem.page.scss'],
})
export class AdditemPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    console.log(form);
  }

}
