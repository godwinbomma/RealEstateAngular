import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynAccountsComponent } from './syn-accounts.component';

describe('SynAccountsComponent', () => {
  let component: SynAccountsComponent;
  let fixture: ComponentFixture<SynAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
