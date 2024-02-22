import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  constructor(private authService: AuthService) {}

  /**
   * Display the username.
   */
  public getUsername(): string {
    return this.authService.getUserData()?.username!;
  }
}
