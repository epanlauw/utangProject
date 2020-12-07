import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthRequest, AuthType } from "../types/User";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

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
}
