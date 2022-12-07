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
    {teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
    {teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
    {teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
    {teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
    {teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
    {teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
    {teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
  ];

  levelCourses: LevelCoursesModel[] = [
    {name: 'Math', courses: [
      {teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
      {teacher: 'Amadou',language: '',name: 'math', description: 'this is desc'},
      {teacher: 'Amadou',language: '',name: 'math', description: 'this is m'}
    ]},
    {name: 'Francais', courses: [
      {teacher: 'Amadou',language: '', name: 'math', description: 'this is m'},
      {teacher: 'Amadou',language: '', name: 'francais', description: 'this is desc'}, 
      {teacher: 'Amadou',language: '', name: 'anglais', description: 'this is m'}
    ]},
    {name: 'anglais', courses: [
      {teacher: 'Amadou',language: '', name: 'math', description: 'this is m'}, 
      {teacher: 'Amadou',language: '', name: 'francais', description: 'this is desc'}, 
      {teacher: 'Amadou',language: '', name: 'anglais', description: 'this is m'}
    ]},
    {name: 'Histoire', courses: [
      {teacher: 'Amadou',language: '', name: 'math', description: 'this is m'}, 
      {teacher: 'Amadou',language: '', name: 'francais', description: 'this is desc'}, 
      {teacher: 'Amadou',language: '', name: 'anglais', description: 'this is m'}
    ]},
    {name: 'Geographie', courses: [
      {teacher: 'Amadou',language: '', name: 'math', description: 'this is m'}, 
      {teacher: 'Amadou',language: '', name: 'francais', description: 'this is desc'}, 
      {teacher: 'Amadou',language: '', name: 'anglais', description: 'this is m'}
    ]},
  ]


}
