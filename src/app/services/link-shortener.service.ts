import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { environment } from "../../environments/environment.dev";
import { Link } from "../interfaces/link";

@Injectable({
  providedIn: 'root'
})
export class LinkShortenerService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  shortenLink(link: string): Observable<Link> {
    return of({ url: '' });
  }
}
