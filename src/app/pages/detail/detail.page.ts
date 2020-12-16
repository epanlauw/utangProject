import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  id:string;
  recipe:any;
  ingredient:string;
  stateTrue:boolean;
  userTrue:boolean;
  users:any;
  user:any;

  constructor(
    private recipeSrv: RecipeService,
    private authSrv: AuthService,
    private loadingCtrl: LoadingController,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {    
    this.getAllUser();
  }

  ionViewWillEnter() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('idDetail')) {return;}
      this.id = paramMap.get('idDetail');
      console.log(this.id);
    });

    this.getUser();
    this.getRecipeDetail();
  } 

  async getRecipeDetail() {
    const loading =  await this.presentLoading();

    this.recipeSrv.getRecipeDetail(this.id).then(res => {
      res.subscribe((data:any) => {
        loading.dismiss();
        this.recipe = data.data.recipe;

        this.stateTrue = true;
      });
    });
  }

  async getAllUser() {
    const loading =  await this.presentLoading();
    this.authSrv.getAllUser().then(res => {
      loading.dismiss();
      res.subscribe((data:any) => {
        this.users = data.data.users;
      });
    });
  }

  async getUser() {
    const loading =  await this.presentLoading();
    this.authSrv.getUser().then(res => {
      res.subscribe((data:any) => {
        loading.dismiss();
        this.user = data.data.user;
        console.log(this.user);
        this.userTrue = true;
      });
    })
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });

    loading.present();
    return loading;
  }
  
}
