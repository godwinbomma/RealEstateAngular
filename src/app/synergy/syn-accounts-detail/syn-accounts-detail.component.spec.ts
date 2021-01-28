import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynAccountsDetailComponent } from './syn-accounts-detail.component';

describe('SynAccountsDetailComponent', () => {
  let component: SynAccountsDetailComponent;
  let fixture: ComponentFixture<SynAccountsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynAccountsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynAccountsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
