import { TeacherModel } from './../../../core/models/teacher.model';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {


  teachers: TeacherModel[] = [];
  columns = [
    {name: 'firstname', value: 'Prénom'},
    {name: 'lastname', value: 'Nom'},
    {name: 'email', value: 'Email'},
    {name: 'status', value: 'Status'},
  ]
  // currentTeacher!:  TeacherModel;
  // courses: CourseModel[] = COURSES;
  // currentCourse!: CourseModel;
  // currentVideo!: any;
  // videos:any = VIDEOS;

  loadData: boolean = true;

  newTeacher!: TeacherModel;



	item: number = 0;

	constructor (
		private adminService: AdminService,
	) 
	{ }

	ngOnInit(): void {
		
	}

	getCourse(event: any) {
		console.log(event);
		
	}

	getNewTeacher(teacher: any) {

		this.adminService.createTeacher(teacher, teacher.email)
	}

  // getTeachers() {
  //   this.adminService.getTeachers()
  //   .subscribe((res: any) => {
  //     console.log(res);
      
  //   });
  //   console.log(this.teachers);
    
  // }

  getItem (id: any) {
    // this.currentTeacher = this.teachers.filter((teacher: TeacherModel) => (teacher.id === id))[0];
    // this.currentCourse= this.courses.filter((course: CourseModel) => (this.currentTeacher.courses[0] === course.id))[0];
    // this.getCourseVideos(this.currentCourse.id);
  }

  getTeacherCourses ()  {
    // return this.courses.filter((course: CourseModel) => (course.teacher === this.currentTeacher.id))
  }

  getCourseVideos(id: string) {
    // this.currentCourse = this.courses.filter((course: CourseModel) => (course.id === id))[0];
    // this.currentVideo = this.videos.filter((video: any) => (video.course === this.currentCourse.id));
  }


}
