import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CreateUser } from '../interfaces/create-user.interface';
import { EditUserData } from '../interfaces/edit-user-data.interface';
import { ModifiedUser } from '../interfaces/modified-user.interface';
import { UserData } from '../interfaces/user-data.interface';
import { LoginData } from '../interfaces/login-data.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  /**
   * Login the user.
   *
   * @param loginData The login data.
   */
  public loginUser(loginData: LoginData): Observable<UserData> {
    return this.httpClient.post<UserData>(`${ environment.apiUrl }/auth`, loginData);
  }

  /**
   * Signs up a user.
   *
   * @param signupData The sign-up data.
   */
  public signupUser(signupData: CreateUser): Observable<UserData> {
    return this.httpClient.post<UserData>(`${ environment.apiUrl }/users`, signupData);
  }

  /**
   * Save the access token to local storage.
   *
   * @param userData The user data.
   */
  public saveUserData(userData: UserData): void {
    localStorage.setItem(environment.localStorageUserDataKey, JSON.stringify(userData));
  }

  /**
   * Get user data.
   */
  public getUserData(): UserData | undefined {
    return localStorage.getItem(environment.localStorageUserDataKey)
      ? JSON.parse(localStorage.getItem(environment.localStorageUserDataKey)!)
      : undefined;
  }

  /**
   * Get user data.
   */
  public editUserData(userData: EditUserData): Observable<ModifiedUser> {
    return this.httpClient.put<ModifiedUser>(`${ environment.apiUrl }/users/${ userData.id }`, userData);
  }

  /**
   * Logout the user.
   */
  public logout(): void {
    localStorage.removeItem(environment.localStorageUserDataKey);

    this.router.navigate(['/', 'auth']);
  }
}
