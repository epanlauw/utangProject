import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { ApiService } from "./api.service";
import { StorageService } from './storage.service';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isLoggedIn = false;
  token: any;

  constructor(private api: ApiService, private storage: StorageService) {}

  loginUser(newUser: any) {
    const user = {
      email: newUser.email,
      password: newUser.password,
    };

    return this.api.auth("login", user).pipe(
      tap((token) => {
        this.storage.setObject("token", token).then(
          () => {
            console.log("Token Stored");
          },
          (err) => console.error("Error storing item", err)
        );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      })
    );
  }

  registerUser(newUser: any) {
    const user = {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
      date_of_birth: newUser.date_of_birth,
      gender: newUser.gender,
      avatar_url: newUser.avatar_url,
      id_role: 1,
    };

    return this.api.auth("register", user).pipe(
      tap((token) => {
        this.storage.setObject("token", token).then(
          () => {
            console.log("Token Stored");
          },
          (err) => console.error("Error storing item", err)
        );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      })
    );
  }
}
