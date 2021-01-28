import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageContactDetailComponent } from './manage-contact-detail.component';

describe('ManageContactDetailComponent', () => {
  let component: ManageContactDetailComponent;
  let fixture: ComponentFixture<ManageContactDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageContactDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageContactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
