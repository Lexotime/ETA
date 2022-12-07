import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePopUpComponent } from './course-pop-up.component';

describe('CoursePopUpComponent', () => {
  let component: CoursePopUpComponent;
  let fixture: ComponentFixture<CoursePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursePopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
