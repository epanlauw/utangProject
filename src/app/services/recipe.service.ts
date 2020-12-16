import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private apiSrv: ApiService) { }

  getAllRecipe() {
    return this.apiSrv.get('recipe');
  }

  getAllType() {
    return this.apiSrv.get('type');
  }

  getRecipeDetail(id_recipe:any) {

  }

  insertRecipe(newInsert: any){
    
  }

  deleteRecipe(id_recipe: any){
   
  }
}
