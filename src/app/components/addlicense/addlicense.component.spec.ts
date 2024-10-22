import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlicenseComponent } from './addlicense.component';

describe('AddlicenseComponent', () => {
  let component: AddlicenseComponent;
  let fixture: ComponentFixture<AddlicenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddlicenseComponent]
    });
    fixture = TestBed.createComponent(AddlicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
