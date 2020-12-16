import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-myrecipe',
  templateUrl: './myrecipe.page.html',
  styleUrls: ['./myrecipe.page.scss'],
})
export class MyrecipePage implements OnInit {
  
  public list:boolean;
  public grid:boolean;
  
  user:any;
  recipes:any;
  types:any;
  recipesUser:any[] = [];
  constructor(
    private recipeSrv:RecipeService,
    private authSrv: AuthService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getUser();
  }

  async showAllRecipe() {
    const loading =  await this.presentLoading();

    this.recipeSrv.getAllRecipe().then(res => {
      res.subscribe((data:any) => {
        loading.dismiss();
        this.recipes = data.data.recipes;
        for(let recipe of this.recipes) {
          if(this.user.id == recipe.id_user) {
            this.recipesUser.push(recipe);
            console.log(this.recipesUser);
          }
        }
        this.list = true;
        this.grid = false;
      });
    });

  }

  async getUser() {
    const loading =  await this.presentLoading();

    this.authSrv.getUser().then(res => {
      res.subscribe((data:any) => {
        loading.dismiss();
        this.user = data.data.user;
        this.showAllRecipe();
        this.getType();
      });
    });

  }

  async getType() {
    this.recipeSrv.getAllType().then(res => {
      res.subscribe((data:any) => {
        this.types = data.data.type;
        console.log(this.types);
      })
    });
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });

    loading.present();
    return loading;
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
