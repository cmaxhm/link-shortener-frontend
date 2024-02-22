import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../../interfaces/user-data.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: AuthService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * Submit the login form.
   */
  public onSubmit(): void {
    const loginData = this.form.value;

    this.loginService.login(loginData)
      .subscribe({
        next: (response: UserData) => {
          this.loginService.saveUserData(response);
          this.router.navigate(['/', 'dashboard']);
        },
        error: (error: HttpErrorResponse) => {

        }
      });
  }
}
