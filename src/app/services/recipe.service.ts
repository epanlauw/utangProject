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
  
  getTypeDetail(id_type:string) {
    return this.apiSrv.get('type/' + id_type);
  }

  getRecipeDetail(id_recipe:any) {

  }

  insertRecipe(newRecipe: any){
    const recipe = {
      name : newRecipe.name,
      ingredient : newRecipe.ingredient,
      steps : newRecipe.steps,
      image_url : newRecipe.imageUrl,
      difficulty :newRecipe.difficulty,
      id_user : newRecipe.id_user,
      id_type : newRecipe.id_type
    }

    //console.log(recipe);

    return this.apiSrv.post('add_recipe', recipe);
  }

  deleteRecipe(id_recipe: any){
   
  }
}
