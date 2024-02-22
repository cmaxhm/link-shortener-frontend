import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.production';
import { CreateLink } from '../interfaces/create-link.interface';
import { Link } from '../interfaces/link.inteface';
import { PaginationQueryParameters } from '../interfaces/pagination-query-parameters.interface';

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get the links for the logged-in user.
   *
   * @param queryParams The query parameters for the request.
   */
  public getLinks(queryParams: Partial<PaginationQueryParameters>): Observable<Link[]> {
    return this.httpClient.get<Link[]>(`${ environment.apiUrl }/links`, { params: queryParams });
  }

  /**
   * Creates a link for the logged-in user.
   *
   * @param link The link to create.
   */
  public createLink(link: CreateLink): Observable<Link> {
    return this.httpClient.post<Link>(`${ environment.apiUrl }/links`, link);
  }

  /**
   * Get the links for the logged-in user.
   *
   * @param linkId The link ID.
   */
  public deleteLink(linkId: number): Observable<unknown> {
    return this.httpClient.delete<unknown>(`${ environment.apiUrl }/links/${ linkId }`);
  }
}
