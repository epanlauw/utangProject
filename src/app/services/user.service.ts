import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id_user: any){
    return this.http.get('http://localhost:8080/getUser.php', id_user);
  }

  insertUser(newUser: any){
    const user = {
      nama: newUser.nama,
      email: newUser.email,
      password: newUser.password,
      telepon: newUser.telepon
    }
    const data = JSON.stringify(user);
    return this.http.post<any>('http://localhost:8080/insertUser.php', data);
  }

  deleteUser(id_user: any){
    const data = JSON.stringify( {id: id_user});
    return this.http.post<any>('http://localhost:8080/deleteUser.php', data);
  }
}
