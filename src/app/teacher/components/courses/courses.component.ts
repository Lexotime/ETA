import { TeacherService } from './../../services/teacher.service';
import { CourseModel } from 'src/app/core/models/course.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

	constructor (private teacherService: TeacherService) {}

	teacher: any = {};
	courses: any = [];
	fragCourses: any = [];
	page: number = 1;
	numberOfElement: number = 10;
	
	ngOnInit(): void {

		this.teacherService.getTeacher().subscribe(s => {
			s.forEach(ss => {
				this.teacher = ss.payload.doc.data();
			})
			
			this.teacherService.getTeacherCourses(this.teacher.id).subscribe(s => {
				this.courses = [];
				
				s.forEach(ss => {
						this.courses.push(ss.payload.doc.data());
				})
				this.fragCourses = [];
				let i = 0;
				while(i < this.courses.length && i < (this.page) * this.numberOfElement) {
					this.fragCourses.push(this.courses[i])
					i++;
				}
			})
		})
	}

	filter (search: string) {

	}

	next () {
		if (this.courses.length > this.page * this.numberOfElement) {
			this.fragCourses = [];
			let i = this.page * this.numberOfElement;
			while(i < this.courses.length && i < (this.page + 1) * this.numberOfElement) {
				this.fragCourses.push(this.courses[i])
				i++;
			}
			this.page ++;			
		}
	}

	previous () {
		if (this.page > 1) {
			this.page --;
			this.fragCourses = [];
			let i = (this.page - 1) * this.numberOfElement;
			while(i < this.courses.length && i - (this.page - 1) * this.numberOfElement < this.numberOfElement) {
				this.fragCourses.push(this.courses[i])
				i++;
			}
		}
	}


}
