import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-theme-test',
  templateUrl: './theme-test.component.html',
  styleUrl: './theme-test.component.css'
})
export class ThemeTestComponent implements OnDestroy {
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
