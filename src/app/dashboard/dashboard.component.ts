import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../auth/services/auth.service';
import { MENU_ITEMS } from './utilities/variables.utility';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public menuItems: MenuItem[];

  constructor(private authService: AuthService) {
    this.menuItems = MENU_ITEMS;
    this.menuItems[3].command = () => this.logout();
  }

  /**
   * Logout the user.
   */
  public logout(): void {
    this.authService.logout();
  }
}
