import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { EditUserData } from '../../../auth/interfaces/edit-user-data.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  /**
   * The subject to stop the subscriptions.
   */
  private unsubscribe$: Subject<void>;

  /**
   * The form to update the user's profile.
   */
  public form: FormGroup;

  /**
   * The message to display to the user after submitting the form.
   */
  public messages: Message[];

  /**
   * Whether the user is currently updating their profile.
   */
  public loadingEditUser: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.messages = [];
    this.loadingEditUser = false;
    this.unsubscribe$ = new Subject();
    this.form = this.formBuilder.group({
      username: [''],
      email: ['', Validators.email],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  /**
   * Initialize the component.
   */
  public ngOnInit(): void {
    this.form.patchValue({ ...this.authService.getUserData() });
  }

  /**
   * Clean up the subscriptions.
   */
  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * Submit the profile form.
   */
  public editUser(): void {
    this.loadingEditUser = true;
    const editUser: EditUserData = {
      id: this.authService.getUserData()?.id!,
      username: this.form.value.username.trim(),
      email: this.form.value.email.trim(),
      password: this.form.value.password.trim()
    };

    this.authService
      .editUserData(editUser)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (editedUser) => {
          const userData = this.authService.getUserData();
          this.loadingEditUser = false;
          this.messages = [
            {
              severity: 'success',
              summary: 'Success',
              detail: 'Profile updated successfully.'
            }
          ];

          this.authService.saveUserData({
            ...userData!,
            username: editedUser.username,
            email: editedUser.email
          });
        },
        error: () => {
          this.loadingEditUser = false;
          this.messages = [
            {
              severity: 'error',
              summary: 'Error',
              detail: 'An error occurred updating your profile. Please try again.'
            }
          ];
        }
      });
  }
}
