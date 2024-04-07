// src/app/home/home.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../service/theme.service';
import { SharedService } from '../../service/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy, OnInit {
  theme!: string;
  Dark = 'dark';
  Light = 'light';
  private subscription: Subscription;


  isLoggedIn: Boolean = false;

  routlinkBook!: string;
  routlinkLib!: string;
  routlinkMusic!: string;


  username!: string;

ngOnInit(): void {
  

}




  constructor(private themeService: ThemeService, private sharedService: SharedService, private router: Router) {
    this.subscription = this.themeService.theme$.subscribe(theme => {
      this.theme = theme;
      console.log(this.theme)
    });


    // window.location.reload()


  }


  
  

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }


  refreshPage() {
    window.location.reload();

    console.log('refresh is triggered')
  }
  
}



