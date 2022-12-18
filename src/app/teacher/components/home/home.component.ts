import { filter } from 'rxjs';
import { TEACHER } from 'src/app/data/dummy';
import { TeacherModel } from '../../../core/models/teacher.model';
import { COURSES, VIDEOS, STUDENTS } from '../../../data/dummy';
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
	students: any = STUDENTS;
	currentStudentList: any;

	columns: {name: string, value: string}[] =[
		{name: 'firstname', value: 'nom'},
		{name: 'lastname', value: 'prenom'},
		{name: 'email', value: 'email'},
		{name: 'status', value: 'etat'},
	];



	ngOnInit(): void {
		let email = localStorage.getItem('login')
	}

	getTeacherCourses () : CourseModel [] {
		return this.courses.filter((course: CourseModel) => (course.teacher === this.currentTeacher.id))
	}

	getCourseVideos(id: string) {
		this.currentCourse = this.courses.filter((course: CourseModel) => (course.id === id))[0];
		this.currentVideo = this.videos.filter((video: any) => (video.course === this.currentCourse.id));
		this.currentStudentList = this.students.filter((student: any) => {
		
		if (student.courses.filter((course: any) => ( course === this.currentCourse.id))[0]){
			return true;}
		return false
		});
		
	}

}
