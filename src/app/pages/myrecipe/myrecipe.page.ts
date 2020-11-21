import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myrecipe',
  templateUrl: './myrecipe.page.html',
  styleUrls: ['./myrecipe.page.scss'],
})
export class MyrecipePage implements OnInit {
  
  public list:boolean;
  public grid:boolean;
  constructor() { }

  ngOnInit() {
    this.list = true;
    this.grid = false;
  }

  changeList() {
    this.list = true;
    this.grid = false;
  }

  changeGrid() {
    this.grid = true;
    this.list = false;
  }
}
