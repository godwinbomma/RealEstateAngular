import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsRevenueOvertimeComponent } from './reports-revenue-overtime.component';

describe('ReportsRevenueOvertimeComponent', () => {
  let component: ReportsRevenueOvertimeComponent;
  let fixture: ComponentFixture<ReportsRevenueOvertimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsRevenueOvertimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsRevenueOvertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
