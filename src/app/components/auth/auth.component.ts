// auth.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  loginData = { email: '', password: '' };
  registerData = { email: '', username: '', password: '' };
  errorMessage!: string;
  logoutMessage!: string;

  constructor(private http: HttpClient) {}

  login() {
    this.http.post('http://localhost:8000/api/login/', this.loginData).subscribe(
      (res: any) => {
        // Handle successful login
        console.log('Logged in successfully', res);
      },
      err => {
        // Handle login error
        this.errorMessage = err.error.message;
      }
    );
  }

  logout() {
    this.http.post('http://localhost:8000/api/logout/', {}).subscribe(
      () => {
        // Handle successful logout
        console.log('Logged out successfully');
        this.logoutMessage = 'Logged out successfully';
      },
      err => {
        // Handle logout error
        console.error('Logout error', err);
      }
    );
  }

  register() {
    this.http.post('http://localhost:8000/api/register/', this.registerData).subscribe(
      (res: any) => {
        // Handle successful registration
        console.log('Registered successfully', res);
      },
      err => {
        // Handle registration error
        this.errorMessage = err.error.message;
      }
    );
  }
}
