// parent.component.ts
import { Component } from '@angular/core';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
  constructor(private themeService: ThemeService) {
    // Subscribe to the theme observable in the constructor
    this.themeService.theme$.subscribe(theme => {
      this.parentTheme = theme;
    });
  }

  parentTheme: string = 'dark';

  toggleTheme(): void {
    const newTheme = this.parentTheme === 'dark' ? 'light' : 'dark';
    this.themeService.setTheme(newTheme);
  }
}
