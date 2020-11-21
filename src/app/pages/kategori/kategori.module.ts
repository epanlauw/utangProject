import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KategoriPageRoutingModule } from './kategori-routing.module';

import { KategoriPage } from './kategori.page';
import { ListComponent } from './list/list.component';
import { GridComponent } from './grid/grid.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KategoriPageRoutingModule
  ],
  declarations: [
    KategoriPage,
    ListComponent,
    GridComponent,
  ]
})
export class KategoriPageModule {}
