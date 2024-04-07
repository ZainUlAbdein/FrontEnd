import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from './service/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy {
  theme: string;
  Dark = 'dark';
  Light = 'light';
  private subscription: Subscription;

  constructor(private themeService: ThemeService) {
    this.theme = 'dark'; // set default theme
    this.subscription = this.themeService.theme$.subscribe(theme => {
      this.theme = theme;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
