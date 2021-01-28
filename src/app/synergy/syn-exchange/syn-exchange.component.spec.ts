import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynExchangeComponent } from './syn-exchange.component';

describe('SynExchangeComponent', () => {
  let component: SynExchangeComponent;
  let fixture: ComponentFixture<SynExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
