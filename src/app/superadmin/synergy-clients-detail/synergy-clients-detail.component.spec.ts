import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynergyClientsDetailComponent } from './synergy-clients-detail.component';

describe('SynergyClientsDetailComponent', () => {
  let component: SynergyClientsDetailComponent;
  let fixture: ComponentFixture<SynergyClientsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynergyClientsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynergyClientsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
