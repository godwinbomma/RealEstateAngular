import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsBalanceBreakdownEditComponent } from './reports-balance-breakdown-edit.component';

describe('ReportsBalanceBreakdownEditComponent', () => {
  let component: ReportsBalanceBreakdownEditComponent;
  let fixture: ComponentFixture<ReportsBalanceBreakdownEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsBalanceBreakdownEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsBalanceBreakdownEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
