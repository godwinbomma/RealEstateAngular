import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpExchangeGeneralComponent } from './emp-exchange-general.component';

describe('EmpExchangeGeneralComponent', () => {
  let component: EmpExchangeGeneralComponent;
  let fixture: ComponentFixture<EmpExchangeGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpExchangeGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpExchangeGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
