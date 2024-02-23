import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { UserData } from '../../interfaces/user-data.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  /**
   * Whether the user is currently logging in.
   */
  public loadingLogIn: boolean;

  /**
   * The form to log in.
   */
  public form: FormGroup;

  /**
   * The messages to show in the component.
   */
  public messages: Message[];

  constructor(
    private formBuilder: FormBuilder,
    private loginService: AuthService,
    private router: Router
  ) {
    this.loadingLogIn = false;
    this.messages = [];
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * Submit the login form.
   */
  public onSubmit(): void {
    this.loadingLogIn = true;
    const loginData = {
      username: this.form.value.username.trim(),
      password: this.form.value.password.trim()
    };

    this.loginService.loginUser(loginData)
      .subscribe({
        next: (response: UserData) => {
          this.loginService.saveUserData(response);
          this.router.navigate(['/', 'dashboard']);
        },
        error: () => {
          this.loadingLogIn = false;
          this.messages = [
            {
              severity: 'error',
              summary: 'Error',
              detail: 'Error logging in. Please try again.'
            }
          ];
        }
      });
  }
}
