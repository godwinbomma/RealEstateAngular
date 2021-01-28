import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusOpenExchangeComponent } from './cus-open-exchange.component';

describe('CusOpenExchangeComponent', () => {
  let component: CusOpenExchangeComponent;
  let fixture: ComponentFixture<CusOpenExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusOpenExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusOpenExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
