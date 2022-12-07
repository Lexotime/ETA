import { Component } from "@angular/core";
import { CourseModel } from "src/app/core/models/course.model";
import { LevelCoursesModel } from "src/app/core/models/level-courses.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  mostViewList: CourseModel[] = [
    {link: 'assets/images/1172309.jpg', teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
    {link: 'assets/images/1172309.jpg', teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
    {link: 'assets/images/1172309.jpg', teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
    {link: 'assets/images/1172309.jpg', teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
    {link: 'assets/images/1172309.jpg', teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
    {link: 'assets/images/1172309.jpg', teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
    {link: 'assets/images/1172309.jpg', teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
  ];

  levelCourses: LevelCoursesModel[] = [
    {name: 'Math', courses: [
      {link: 'assets/courses/', teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
      {link: 'assets/courses/', teacher: 'Amadou',language: '',name: 'math', description: 'this is desc'},
      {link: 'assets/courses/', teacher: 'Amadou',language: '',name: 'math', description: 'this is m'}
    ]},
    {name: 'Francais', courses: [
      {link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'math', description: 'this is m'},
      {link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'francais', description: 'this is desc'}, 
      {link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'anglais', description: 'this is m'}
    ]},
    {name: 'anglais', courses: [
      {link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'math', description: 'this is m'}, 
      {link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'francais', description: 'this is desc'}, 
      {link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'anglais', description: 'this is m'}
    ]},
    {name: 'Histoire', courses: [
      {link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'math', description: 'this is m'}, 
      {link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'francais', description: 'this is desc'}, 
      {link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'anglais', description: 'this is m'}
    ]},
    {name: 'Geographie', courses: [
      {link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'math', description: 'this is m'}, 
      {link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'francais', description: 'this is desc'}, 
      {link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'anglais', description: 'this is m'}
    ]},
  ]


}
