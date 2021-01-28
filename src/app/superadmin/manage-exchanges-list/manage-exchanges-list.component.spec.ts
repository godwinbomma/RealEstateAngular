import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExchangesListComponent } from './manage-exchanges-list.component';

describe('ManageExchangesListComponent', () => {
  let component: ManageExchangesListComponent;
  let fixture: ComponentFixture<ManageExchangesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageExchangesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageExchangesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
