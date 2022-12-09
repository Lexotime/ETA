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
  //   {level: 'CI', link: 'assets/images/1172309.jpg', teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
  //   {level: 'CI', link: 'assets/images/1172309.jpg', teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
  //   {level: 'CI', link: 'assets/images/1172309.jpg', teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
  //   {level: 'CI', link: 'assets/images/1172309.jpg', teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
  //   {level: 'CI', link: 'assets/images/1172309.jpg', teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
  //   {level: 'CI', link: 'assets/images/1172309.jpg', teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
  //   {level: 'CI', link: 'assets/images/1172309.jpg', teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
  ];

  levelCourses: LevelCoursesModel[] = [
  //   {name: 'Math', courses: [
  //     {level: 'CI', link: 'assets/courses/', teacher: 'Amadou',language: '',name: 'math', description: 'this is m', },
  //     {level: 'CI', link: 'assets/courses/', teacher: 'Amadou',language: '',name: 'math', description: 'this is desc'},
  //     {level: 'CI', link: 'assets/courses/', teacher: 'Amadou',language: '',name: 'math', description: 'this is m'}
  //   ]},
  //   {name: 'Francais', courses: [
  //     {level: 'CI', link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'math', description: 'this is m'},
  //     {level: 'CI', link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'francais', description: 'this is desc'}, 
  //     {level: 'CI', link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'anglais', description: 'this is m'}
  //   ]},
  //   {name: 'anglais', courses: [
  //     {level: 'CI', link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'math', description: 'this is m'}, 
  //     {level: 'CI', link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'francais', description: 'this is desc'}, 
  //     {level: 'CI', link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'anglais', description: 'this is m'}
  //   ]},
  //   {name: 'Histoire', courses: [
  //     {level: 'CI', link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'math', description: 'this is m'}, 
  //     {level: 'CI', link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'francais', description: 'this is desc'}, 
  //     {level: 'CI', link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'anglais', description: 'this is m'}
  //   ]},
  //   {name: 'Geographie', courses: [
  //     {level: 'CI', link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'math', description: 'this is m'}, 
  //     {level: 'CI', link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'francais', description: 'this is desc'}, 
  //     {level: 'CI', link: 'assets/courses/', teacher: 'Amadou',language: '', name: 'anglais', description: 'this is m'}
  //   ]},
  ]


}
