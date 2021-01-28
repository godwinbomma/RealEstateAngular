import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplareFieldsContactComponent } from './templare-fields-contact.component';

describe('TemplareFieldsContactComponent', () => {
  let component: TemplareFieldsContactComponent;
  let fixture: ComponentFixture<TemplareFieldsContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplareFieldsContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplareFieldsContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
