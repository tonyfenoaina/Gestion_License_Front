import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutlicenceComponent } from './aboutlicence.component';

describe('AboutlicenceComponent', () => {
  let component: AboutlicenceComponent;
  let fixture: ComponentFixture<AboutlicenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutlicenceComponent]
    });
    fixture = TestBed.createComponent(AboutlicenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
