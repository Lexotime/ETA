import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelCoursesListComponent } from './level-courses-list.component';

describe('LevelCoursesListComponent', () => {
  let component: LevelCoursesListComponent;
  let fixture: ComponentFixture<LevelCoursesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelCoursesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelCoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
