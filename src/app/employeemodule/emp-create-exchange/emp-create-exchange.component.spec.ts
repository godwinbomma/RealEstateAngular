import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpCreateExchangeComponent } from './emp-create-exchange.component';

describe('EmpCreateExchangeComponent', () => {
  let component: EmpCreateExchangeComponent;
  let fixture: ComponentFixture<EmpCreateExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpCreateExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpCreateExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
