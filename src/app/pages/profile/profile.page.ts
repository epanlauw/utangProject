import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any = "";
  constructor(
    private authSrv: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.showUser();
  }

  async showUser() {
    const loading =  await this.presentLoading();

    this.authSrv.getUser().then(res => {
      res.subscribe((data:any) => {
        loading.dismiss();
        this.user = data.data.user;
        console.log(this.user);
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

  changeEdit() {
    this.router.navigateByUrl("profile/edit");
  }

}
