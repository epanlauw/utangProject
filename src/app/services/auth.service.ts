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

  getUser() {
    return this.api.get("detail_profile");
  }

  getAllUser() {
    return this.api.get("user");
  }

  logoutUser() {
    return this.api.get("logout").then( res => res.subscribe(data => {
      console.log(data);
      this.storage.removeItem("token");
      return data;
    })
    );
  }

  editUser(existingUser: any) {
    const user = {
      first_name: existingUser.first_name,
      last_name: existingUser.last_name,
      email: existingUser.email,
      date_of_birth: existingUser.date_of_birth,
      gender: existingUser.gender,
      avatar_url: existingUser.avatar_url,
      id_role: 1,
    }

    return this.api.put("edit_profile",user);
  }
}
