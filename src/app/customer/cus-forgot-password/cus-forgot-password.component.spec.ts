import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusForgotPasswordComponent } from './cus-forgot-password.component';

describe('CusForgotPasswordComponent', () => {
  let component: CusForgotPasswordComponent;
  let fixture: ComponentFixture<CusForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusForgotPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
