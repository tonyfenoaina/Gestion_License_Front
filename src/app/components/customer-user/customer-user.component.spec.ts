import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUserComponent } from './customer-user.component';

describe('CustomerUserComponent', () => {
  let component: CustomerUserComponent;
  let fixture: ComponentFixture<CustomerUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerUserComponent]
    });
    fixture = TestBed.createComponent(CustomerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
