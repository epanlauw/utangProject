import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyrecipePageRoutingModule } from './myrecipe-routing.module';

import { MyrecipePage } from './myrecipe.page';
import { ListComponent } from './list/list.component';
import { GridComponent } from './grid/grid.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyrecipePageRoutingModule
  ],
  declarations: [
    MyrecipePage,
    ListComponent,
    GridComponent
  ]
})
export class MyrecipePageModule {}
