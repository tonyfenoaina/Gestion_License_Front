import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPcComponent } from './add-pc.component';

describe('AddPcComponent', () => {
  let component: AddPcComponent;
  let fixture: ComponentFixture<AddPcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPcComponent]
    });
    fixture = TestBed.createComponent(AddPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
