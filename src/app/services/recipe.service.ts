import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getRecipe(id_recipe: any){
    return this.http.get('http://localhost:8080/getUser.php', id_recipe);
  }

  insertRecipe(newUser: any){
    const recipe = {
      nama: newUser.nama,
      bahan: newUser.bahan,
      langkah: newUser.langkah,
      urlVideo: newUser.urlVideo
    }
    const data = JSON.stringify(recipe);
    return this.http.post<any>('http://localhost:8080/insertUser.php', data);
  }

  deleteRecipe(id_recipe: any){
    const data = JSON.stringify( {id: id_recipe});
    return this.http.post<any>('http://localhost:8080/deleteUser.php', data);
  }
}
