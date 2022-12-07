import { Component } from '@angular/core';
import { CourseModel } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {

  list: CourseModel[] = [
    {name: 'bouna'},
    {name: 'bamba'},
    {name: 'bar'}
  ]
}
