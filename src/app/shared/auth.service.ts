import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // public loggedIn = false;
  private token!: any;

  constructor(private http: HttpClient) {}

  login(username: string, password: string, token: string) {
    return this.http.post<any>('http://localhost:8000/api/login/', { username, password })
      .toPromise()
      .then(data => {
        // this.loggedIn = true;
        this.token = data.token; // Assuming the token is returned as 'access' in the response
        token = data.token
         localStorage.setItem('token', this.token);
      })
      .catch(error => console.error('Error logging in', error));
  }



  Signup_1(username: string, email: string, password: string, password2: string) {
    return this.http.post<any>('http://localhost:8000/api/register/', { username, email, password, password2 })
      .toPromise()
      .then(data => {
        console.log(data)
        
      })
      .catch(error => console.error('Error logging in', error));
  }


  // logout() {
  //   this.loggedIn = false;
  //   this.token = null;
  //   localStorage.removeItem('token');
  // }

  // isLoggedIn(): boolean {
  //     return this.loggedIn;
  // }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }




}
