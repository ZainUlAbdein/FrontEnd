// src/app/navbar/navbar.component.ts
import { Component, OnDestroy } from '@angular/core';
import { ThemeService } from '../../service/theme.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {
  isMenuCollapsed = true;
  theme!: string;
  Dark = 'dark';
  Light = 'light';
  private subscription: Subscription;
  IsLog!: string;
  TheLog: Boolean = false;
  authService: any;

  constructor(private themeService: ThemeService, private location: Location, private router: Router) {
    this.subscription = this.themeService.theme$.subscribe(theme => {
      this.theme = theme;
    });

   



    
    
  }







  toggleTheme(): void {
    const newTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.themeService.setTheme(newTheme);
  }

  toggleMenu(): void {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  
  refreshPage() {
    window.location.reload()
  }

}
