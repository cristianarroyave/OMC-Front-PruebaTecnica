import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginWebService: string = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  login(body: string): Observable<any>
  {
    return this.http.post(this.loginWebService + '/login', body, {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
        })
      });
  }

  logOff(): void 
  {
    sessionStorage.clear();
  }

  isLogged(): boolean 
  {
    return "jwt" in sessionStorage;
  }
}
