import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynOpenExchangeComponent } from './syn-open-exchange.component';

describe('SynOpenExchangeComponent', () => {
  let component: SynOpenExchangeComponent;
  let fixture: ComponentFixture<SynOpenExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynOpenExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynOpenExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
