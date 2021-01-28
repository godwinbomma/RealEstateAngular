import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpExchangeListComponent } from './emp-exchange-list.component';

describe('EmpExchangeListComponent', () => {
  let component: EmpExchangeListComponent;
  let fixture: ComponentFixture<EmpExchangeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpExchangeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpExchangeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
