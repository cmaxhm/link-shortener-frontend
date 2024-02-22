import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get all users.
   */
  public getUsers() {
    return this.httpClient.get(`${ environment.apiUrl }/users`);
  }
}
