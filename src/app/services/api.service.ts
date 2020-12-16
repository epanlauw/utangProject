import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthRequest, AuthType } from "../types/User";
import { StorageService } from './storage.service';

@Injectable({
  providedIn: "root",
})
export class ApiService {

  options:any;
  constructor(
    private http: HttpClient,
    private storage: StorageService
    ) {}

  getPath(path: string) {
    const { api_url } = environment;
    return `${api_url}/${path}`;
  }

  auth(type: AuthType, data: AuthRequest) {
    const options = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    };

    return this.http.post(this.getPath(type), JSON.stringify(data), options);
  }


  async get(type:string) {
    return await this.storage.getObject("token").then((res:any) => {
      this.options = {
        headers: new HttpHeaders({
          'Authorization': "Bearer " + res.data.token
        }),
      }
      return this.http.get(this.getPath(type), this.options);
    });
    
  }

  async post(type:string, data:object) {
    return await this.storage.getObject("token").then((res:any) => {
      this.options = {
        headers: new HttpHeaders({
          'Authorization': "Bearer " + res.data.token,
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      }

      return this.http.post(this.getPath(type), data ,this.options);
    });
  }

  async put(type:string, data: object) {
    return await this.storage.getObject("token").then((res:any) => {
      this.options = {
        headers: new HttpHeaders({
          'Authorization': "Bearer " + res.data.token,
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      }

      return this.http.put(this.getPath(type), data ,this.options);
    });
  }

  async delete(type:string) {
    return await this.storage.getObject("token").then((res:any) => {
      this.options = {
        headers: new HttpHeaders({
          'Authorization': "Bearer " + res.data.token,
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      }

      return this.http.delete(this.getPath(type), this.options);
    });
  }
}
