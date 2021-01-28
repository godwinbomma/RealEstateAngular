import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusDashboardInchangeComponent } from './cus-dashboard-inchange.component';

describe('CusDashboardInchangeComponent', () => {
  let component: CusDashboardInchangeComponent;
  let fixture: ComponentFixture<CusDashboardInchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusDashboardInchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusDashboardInchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
