import { CourseModel } from 'src/app/core/models/course.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  courses: CourseModel[] = [
    {link: 'assets/images/1172309.jpg', teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
    {link: 'assets/images/1172309.jpg', teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
    {link: 'assets/images/1172309.jpg', teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
    {link: 'assets/images/1172309.jpg', teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
    {link: 'assets/images/1172309.jpg', teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
    {link: 'assets/images/1172309.jpg', teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
    {link: 'assets/images/1172309.jpg', teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
  ];
}
