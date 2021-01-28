import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusExchangeComponent } from './cus-exchange.component';

describe('CusExchangeComponent', () => {
  let component: CusExchangeComponent;
  let fixture: ComponentFixture<CusExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
