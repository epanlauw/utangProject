import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyrecipePage } from './myrecipe.page';

const routes: Routes = [
  {
    path: '',
    component: MyrecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyrecipePageRoutingModule {}
