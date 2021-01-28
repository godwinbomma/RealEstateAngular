import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynLoginComponent } from './syn-login.component';

describe('SynLoginComponent', () => {
  let component: SynLoginComponent;
  let fixture: ComponentFixture<SynLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
