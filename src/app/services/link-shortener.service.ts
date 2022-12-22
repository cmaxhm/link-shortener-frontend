import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.dev";
import { ResponseLink } from "../interfaces/link.interface";

@Injectable({
  providedIn: 'root'
})
export class LinkShortenerService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  shortenLink(link: string): Observable<ResponseLink> {
    return this.httpClient.post<ResponseLink>(`${ this.apiUrl }/`, { url: link });
  }
}
