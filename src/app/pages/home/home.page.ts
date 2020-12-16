import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  recipes: any;
  pRecipe: any[] = [];
  fRecipe: any[] = [];
  tRecipe: any[] = [];
  types: any;
  constructor(
    private recipeSrv: RecipeService,
    private loadingCtrl: LoadingController,
    private router: Router,
  ) {}
  
  ionViewWillEnter() {
    this.pRecipe = [];
    this.fRecipe = [];
    this.tRecipe = [];
    this.showAllRecipe();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });

    loading.present();
    return loading;
  }

  async showAllRecipe() {
    const loading =  await this.presentLoading();

    this.recipeSrv.getAllRecipe().then(res => {
      res.subscribe((data:any) => {
        loading.dismiss();
        this.recipes = data.data.recipes;
        this.showAllTypes();

        console.log(this.recipes);
        
        this.popularRecipe();
        this.featuredRecipe();
      });
    });
  }

  async showAllTypes() {
    this.recipeSrv.getAllType().then(res => {
      res.subscribe((data:any) => {
        this.types = data.data.type;
      })
    })
  }

  async featuredRecipe() {
    for(let i = 0; i < 3; i++) {
      this.fRecipe.push(this.recipes[i]);
    }
  }

  popularRecipe() {
    for(let i = 0; i < 10; i++) {
      this.pRecipe.push(this.recipes[i]);
    }
  }

  changeToKategori(typeId) {
    this.router.navigate(['/kategori/', typeId]);
  }
}
