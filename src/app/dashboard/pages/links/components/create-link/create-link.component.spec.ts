import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../../../../shared/shared.module';
import { CreateLinkComponent } from './create-link.component';

describe('CreateLinkComponent', () => {
  let component: CreateLinkComponent;
  let fixture: ComponentFixture<CreateLinkComponent>;

  beforeEach(async () => {
    await TestBed
      .configureTestingModule({
        declarations: [CreateLinkComponent],
        imports: [
          HttpClientTestingModule,
          SharedModule
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(CreateLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
