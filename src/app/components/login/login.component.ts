// login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


import { Location } from '@angular/common';
import { SharedService } from '../../service/shared.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';
  isloggedin: boolean = false
  token!: any;
  tokenType!: 'Token';
  islogin: boolean = false;
  email: string = '';
  password2!: string;
  routelinkhome!: string;
  TheToken!: string;

  refresh: Boolean = false;


  constructor(public authService: AuthService, private http: HttpClient, private location: Location, private router: Router, private sharedService: SharedService) {
    this.token = this.authService.getToken();
    if (this.token == null ) {
      // this.isloggedin = true;
      // this.authService.loggedIn = true
      console.log(this.token)
    } else {
      // this.isloggedin = false;
      // this.authService.loggedIn = false;
      console.log(this.token)
    }
  }

  triggerFunctionOfComponent2() {
    this.sharedService.triggerFunction();
  }


  goToHome() {
    this.token = this.authService.getToken();
    if (this.token == null ) {
      this.routelinkhome = '/authentication'
      console.log(this.token)
    } else {
      this.routelinkhome = '/home'
      console.log(this.token)
      this.router.navigate(['/home'])
    }
  }


  navigateToSameRoute() {
    this.router.navigate([this.router.url]);
  }

  
  login() {
    this.authService.login(this.username, this.password, this.TheToken)
      .then(data => {
        console.log("logged in", localStorage.getItem('token'));
        this.refreshPage();
      // this.triggerFunctionOfComponent2()
      })
      .catch(error => {
        this.error = 'Invalid credentials';
      });
      this.router.navigate(['/home'])     
  }
  
  


  refreshPage() {
    window.location.reload();
  }


  Signup() {
    return this.http.post<any>('http://localhost:8000/api/register/', { username:this.username, email:this.email, password:this.password, password2:this.password2 })
      .toPromise()
      .then(data => {
        console.log(data)
        if (data.response) {
          this.login()
          this.toggleAuth()
          this.router.navigate(['/home']);

        }     
      })
      .catch(error => console.error('Error logging in', error));
  }
  toggleAuth () {
    this.islogin = !this.islogin;
  }



  async logout() {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/logout_user/', {
        method: 'POST',
        headers: {
          'Authorization': 'Token ' + localStorage.getItem("token")
        }
      });
      const data = await response.json();
      console.log(data);
      // this.authService.loggedIn = true
      localStorage.clear();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }


  async get_info_user() {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/get_user_info/', {
        method: 'GET',
        headers: {
          'Authorization': 'Token ' + localStorage.getItem("token")
        }
      });
      const data = await response.json();
      console.log(data)
      return data
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
}




