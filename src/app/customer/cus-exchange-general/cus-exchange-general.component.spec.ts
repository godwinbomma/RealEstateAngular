import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusExchangeGeneralComponent } from './cus-exchange-general.component';

describe('CusExchangeGeneralComponent', () => {
  let component: CusExchangeGeneralComponent;
  let fixture: ComponentFixture<CusExchangeGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusExchangeGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusExchangeGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
