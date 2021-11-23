import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }


  constructor(private http: HttpClient) { }

  //servicio que me deja listar usuarios
  getUser(email):Observable<any>
  {
    return this.http.get('http://127.0.0.1:8000/api/users/'+email).pipe( retry(3) );
  }

  //servicio que me deja guardar usuario
  postUser(user):Observable<any>
  {
    return this.http.post('http://127.0.0.1:8000/api/users/', user);
  }

  //servicio que me dejar actualizar al usuario, especificamente su contraseña
  putUser(email, user):Observable<any>
  {
    return this.http.put('http://127.0.0.1:8000/api/users/'+email, user);
  }

  //servicio que me deja eliminar la cuenta del usuario
  deleteUser(email):Observable<any>
  {
    return this.http.delete('http://127.0.0.1:8000/api/users/'+email);

  }

}
