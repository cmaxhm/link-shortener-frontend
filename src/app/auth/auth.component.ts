import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Check if the user is already logged in and redirect to the dashboard.
   */
  public ngOnInit(): void {
    if (this.authService.getUserData()?.token) {
      this.router.navigate(['/', 'dashboard']);
    }
  }
}
