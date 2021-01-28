import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynManageAgentComponent } from './syn-manage-agent.component';

describe('SynManageAgentComponent', () => {
  let component: SynManageAgentComponent;
  let fixture: ComponentFixture<SynManageAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynManageAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynManageAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
