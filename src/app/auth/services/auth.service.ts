import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { UserData } from '../interfaces/user-data.interface';
import { Login } from '../interfaces/login.interface';

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
  public login(loginData: Login): Observable<UserData> {
    return this.httpClient.post<UserData>(`${ environment.apiUrl }/auth`, loginData);
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
   * Get user ID.
   */
  public getUserData(): UserData | undefined {
    return localStorage.getItem(environment.localStorageUserDataKey)
      ? JSON.parse(localStorage.getItem(environment.localStorageUserDataKey)!)
      : undefined;
  }

  /**
   * Logout the user.
   */
  public logout(): void {
    localStorage.removeItem(environment.localStorageUserDataKey);

    this.router.navigate(['/', 'auth']);
  }
}
