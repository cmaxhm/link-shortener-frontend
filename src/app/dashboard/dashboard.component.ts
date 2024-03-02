import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../auth/services/auth.service';
import { MENU_ITEMS } from './utilities/variables.utility';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  /**
   * The menu items for the dashboard.
   */
  public menuItems: MenuItem[];

  /**
   * Whether the dark theme is enabled.
   */
  public isDarkThemeEnabled: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService
  ) {
    this.isDarkThemeEnabled = false;
    this.menuItems = MENU_ITEMS;
    this.menuItems[3].command = () => this.logout();
  }

  /**
   * Switch the theme.
   */
  public switchTheme(): void {
    const linkElement: HTMLLinkElement = this.document.querySelector('head #app-theme')!;

    if (this.isDarkThemeEnabled) {
      linkElement.setAttribute('href', 'dark-theme.css');
    } else {
      linkElement.setAttribute('href', 'light-theme.css');
    }
  }

  /**
   * Logout the user.
   */
  public logout(): void {
    this.authService.logout();
  }
}
