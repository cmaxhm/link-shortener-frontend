import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { of } from "rxjs";
import { Link } from "../interfaces/link";

import { LinkShortenerService } from './link-shortener.service';

describe('LinkShortenerService', () => {
  let service: LinkShortenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(LinkShortenerService);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should send link to be shortened', () => {
    service.shortenLink('http://test.com/').subscribe((link: Link) => {
      expect(link).toBeTruthy();
    });
  });
});
