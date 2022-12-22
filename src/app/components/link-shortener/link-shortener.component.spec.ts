import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { Observable, of } from "rxjs";
import { ResponseLink } from "../../interfaces/link.interface";
import { LinkShortenerService } from "../../services/link-shortener.service";
import { LinkShortenerComponent } from './link-shortener.component';

const MockLinkShortenerService: {
  shortenLink: () => Observable<ResponseLink>
} = {
  shortenLink: () => of({
    _id: 1,
    uuid: 'testuuid',
    shortUrlId: 'testshortUrlId',
    originalUrl: 'testoriginalUrl'
  })
};

describe('LinkShortenerComponent', () => {
  let component: LinkShortenerComponent;
  let fixture: ComponentFixture<LinkShortenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkShortenerComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: LinkShortenerService,
          useValue: MockLinkShortenerService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkShortenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should set form status', () => {
    component.isSent = false;
    component.sendForm();

    expect(component.isSent).toBeTrue();
  });

  it('Should disable link input', () => {
    const linkInput: DebugElement = fixture.debugElement.query(By.css('.link-input'));

    component.form.setValue({ link: 'https://test.com/'});
    component.sendForm();
    fixture.detectChanges();

    expect(linkInput.attributes).toBeTruthy();
  });

  it('Should enable link input', () => {
    component.form.setValue({ link: 'https://test.com/'});
    component.sendForm();
    fixture.detectChanges();
    expect(component.form.value.link).toBeTruthy();
  });
});
