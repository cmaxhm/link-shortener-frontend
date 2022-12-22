import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { environment } from "../../environments/environment.dev";
import { ResponseLink } from "../interfaces/link.interface";

import { LinkShortenerService } from './link-shortener.service';

describe('LinkShortenerService', () => {
  let service: LinkShortenerService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [LinkShortenerService]
    });
    service = TestBed.inject(LinkShortenerService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should send link to be shortened', () => {
    let testLink: ResponseLink;
    const responseTestLink: ResponseLink = {
      _id: 1,
      uuid: 'testuuid',
      shortUrlId: 'testshortUrlId',
      originalUrl: 'testoriginalUrl'
    };

    service
      .shortenLink('http://test.com/')
      .subscribe((link: ResponseLink) => link);

    controller.expectOne(`${environment.apiUrl}/`).flush(responseTestLink);
    testLink = responseTestLink;

    expect(testLink).toEqual(responseTestLink);
  });
});
