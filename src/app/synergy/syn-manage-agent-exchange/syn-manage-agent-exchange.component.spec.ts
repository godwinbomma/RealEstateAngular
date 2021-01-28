import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynManageAgentExchangeComponent } from './syn-manage-agent-exchange.component';

describe('SynManageAgentExchangeComponent', () => {
  let component: SynManageAgentExchangeComponent;
  let fixture: ComponentFixture<SynManageAgentExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynManageAgentExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynManageAgentExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
