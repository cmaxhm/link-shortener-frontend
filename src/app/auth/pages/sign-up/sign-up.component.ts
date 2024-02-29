import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { CreateUser } from '../../interfaces/create-user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  /**
   * The form to sign up.
   */
  public form: FormGroup;

  /**
   * The messages to show in the component.
   */
  public messages: Message[];

  constructor(
    private formBuilder: FormBuilder,
    private loginService: AuthService
  ) {
    this.messages = [];
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]]
    });
  }

  /**
   * Submit the login form.
   */
  public onSubmit(): void {
    const signUpData: CreateUser = {
      username: this.form.value.username.trim(),
      email: this.form.value.email.trim(),
      password: this.form.value.password.trim()
    };

    this.loginService
      .signupUser(signUpData)
      .subscribe({
        next: () => {
          this.messages = [
            {
              severity: 'success',
              summary: 'Success',
              detail: 'Account created successfully. You can now login.'
            }
          ];

          this.form.disable();
        },
        error: () => {
          this.messages = [
            {
              severity: 'error',
              summary: 'Error',
              detail: 'Error creating account. Please try again.'
            }
          ];
        }
      });
  }
}
