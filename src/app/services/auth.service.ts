import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token:any;
  error: any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage
  ) { }

  loginUser(newUser:any) {
    const options = {
      headers: new HttpHeaders({
        "Accept": 'application/json',
        'Content-Type': 'application/json'
      })
    };
    const user = {
      email: newUser.email,
      password: newUser.password,
    };

    const data = JSON.stringify(user);

    return this.http.post(environment.api_url + 'login', data, options).pipe(
      tap(token => {
        this.storage.setItem('token', token)
        .then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }
      ),
    );
  }

  registerUser(newUser:any) {

  }

}
