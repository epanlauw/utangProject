import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isLoggedIn = false;
  token: any;

  constructor(private api: ApiService, private storage: NativeStorage) {}

  loginUser(newUser: any) {
    const user = {
      email: newUser.email,
      password: newUser.password,
    };

    return this.api.auth("login", user).pipe(
      tap((token) => {
        this.storage.setItem("token", token).then(
          () => {
            console.log("Token Stored");
          },
          (error) => console.error("Error storing item", error)
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

    return this.api.auth("register", user);
  }
}
