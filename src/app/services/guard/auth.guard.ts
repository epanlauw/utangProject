import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private storage: StorageService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Promise((resolve) => {
      this.storage.getObject("token").then(
        (data:any) => {
          const token = data;
          if(token) {
            resolve(true);
            console.log(token);
          } 
          else {
            this.router.navigateByUrl("login");
            resolve(false);
            console.log(token);
          }
        }
      );

    });
  }
  
}
