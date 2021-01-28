import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsRevenueOvertimeEditComponent } from './reports-revenue-overtime-edit.component';

describe('ReportsRevenueOvertimeEditComponent', () => {
  let component: ReportsRevenueOvertimeEditComponent;
  let fixture: ComponentFixture<ReportsRevenueOvertimeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsRevenueOvertimeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsRevenueOvertimeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
