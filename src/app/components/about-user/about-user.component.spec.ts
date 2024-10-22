import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUserComponent } from './about-user.component';

describe('AboutUserComponent', () => {
  let component: AboutUserComponent;
  let fixture: ComponentFixture<AboutUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutUserComponent]
    });
    fixture = TestBed.createComponent(AboutUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
