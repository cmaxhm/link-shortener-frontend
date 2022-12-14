import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from "@angular/forms";
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LinkShortenerComponent } from "./components/link-shortener/link-shortener.component";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        LinkShortenerComponent
      ],
      providers: [
        FormBuilder
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
