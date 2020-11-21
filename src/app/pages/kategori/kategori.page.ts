import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.page.html',
  styleUrls: ['./kategori.page.scss'],
})
export class KategoriPage implements OnInit {
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
