// child.component.ts
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnDestroy {
  theme: string;
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
