import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsBalanceBreakdownComponent } from './reports-balance-breakdown.component';

describe('ReportsBalanceBreakdownComponent', () => {
  let component: ReportsBalanceBreakdownComponent;
  let fixture: ComponentFixture<ReportsBalanceBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsBalanceBreakdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsBalanceBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
