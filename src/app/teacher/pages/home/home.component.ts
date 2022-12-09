import { TEACHER } from 'src/app/data/dummy';
import { TeacherModel } from './../../../core/models/teacher.model';
import { COURSES, VIDEOS } from './../../../data/dummy';
import { CourseModel } from 'src/app/core/models/course.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  teachers: TeacherModel[] = TEACHER;
  currentTeacher!:  TeacherModel;
  courses: CourseModel[] = COURSES;
  currentCourse!: CourseModel;
  currentVideo!: any;
  videos:any = VIDEOS;


  ngOnInit(): void {
    this.currentTeacher = this.teachers[0];
    this.currentCourse = this.getTeacherCourses()[0];
    this.getCourseVideos(this.currentCourse.id);
  }

  getTeacherCourses () : CourseModel [] {
    return this.courses.filter((course: CourseModel) => (course.teacher === this.currentTeacher.id))
  }

  getCourseVideos(id: string) {
    this.currentCourse = this.courses.filter((course: CourseModel) => (course.id === id))[0];
    this.currentVideo = this.videos.filter((video: any) => (video.course === this.currentCourse.id));
  }

}
