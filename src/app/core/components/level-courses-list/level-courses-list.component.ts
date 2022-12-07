import { Component, Input } from '@angular/core';
import { CourseModel } from '../../models/course.model';
import { LevelCoursesModel } from '../../models/level-courses.model';

@Component({
  selector: 'app-level-courses-list',
  templateUrl: './level-courses-list.component.html',
  styleUrls: ['./level-courses-list.component.css']
})
export class LevelCoursesListComponent {

  @Input () levelCourses!: LevelCoursesModel [];
  @Input() name!: string;


}
