import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynForgotPasswordComponent } from './syn-forgot-password.component';

describe('SynForgotPasswordComponent', () => {
  let component: SynForgotPasswordComponent;
  let fixture: ComponentFixture<SynForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynForgotPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
