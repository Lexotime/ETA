import { Component } from "@angular/core";
import { CourseModel } from "src/app/core/models/course.model";
import { LevelCoursesModel } from "src/app/core/models/level-courses.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  courses: LevelCoursesModel[] = [
    {name: 'a', courses: [{name: 'math'}, {name: 'francais'}, {name: 'anglais'}]},
    {name: 'a', courses: [{name: 'math'}, {name: 'francais'}, {name: 'anglais'}]},
    {name: 'a', courses: [{name: 'math'}, {name: 'francais'}, {name: 'anglais'}]},
    {name: 'a', courses: [{name: 'math'}, {name: 'francais'}, {name: 'anglais'}]},
    {name: 'a', courses: [{name: 'math'}, {name: 'francais'}, {name: 'anglais'}]},
    {name: 'a', courses: [{name: 'math'}, {name: 'francais'}, {name: 'anglais'}]},
    {name: 'a', courses: [{name: 'math'}, {name: 'francais'}, {name: 'anglais'}]}
  ]


}
