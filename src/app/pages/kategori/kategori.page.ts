import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.page.html',
  styleUrls: ['./kategori.page.scss'],
})
export class KategoriPage implements OnInit {
  public list:boolean;
  public grid:boolean;

  recipes:any;
  id:string;
  types:any[] = [];
  recipeType:any[] = [];
  lengthRecipe: number;

  constructor(
    private recipeSrv: RecipeService,
    private loadingCtrl: LoadingController,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('idKategori')) {return;}
      this.id = paramMap.get('idKategori');
    });
  }

  ionViewWillEnter() {
    this.types = [];
    this.recipeType = [];
    this.getTypeDetail();
    this.showAllRecipe();
  }

  async showAllRecipe() {
    const loading =  await this.presentLoading();
    this.recipeSrv.getAllRecipe().then(res => {
      res.subscribe((data:any) => {
        loading.dismiss();
        this.recipes = data.data.recipes;
        for(let recipe of this.recipes) {
          if(this.id == recipe.id_type) {
            this.recipeType.push(recipe);
          }
        }
        this.list = true;
        this.grid = false;
      });
    })
    
  }

  async getTypeDetail() {
    const loading =  await this.presentLoading();
    this.recipeSrv.getTypeDetail(this.id).then(res => {
      res.subscribe((data:any) => {
        loading.dismiss();
        this.types.push(data.data.type);
        console.log(this.types);
      });
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
