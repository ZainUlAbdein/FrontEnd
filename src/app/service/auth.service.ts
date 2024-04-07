// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private baseUrl = 'http://localhost:8000/api/';

//   constructor(private http: HttpClient) { }

//   signup(signupData: any) {
//     return this.http.post<any>(`${this.baseUrl}signup/`, signupData);
//   }

//   login(loginData: any) {
//     return this.http.post<any>(`${this.baseUrl}login/`, loginData);
//   }

//   logout() {
//     return this.http.post<any>(`${this.baseUrl}logout/`, {});
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  signup(signupData: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}signup/`, signupData);
  }

  login(loginData: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}login/`, loginData);
  }

  logout(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}logout/`, {});
  }

  isLoggedIn(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}isloggedin/`);
  }
}
