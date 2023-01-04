import { StudentService } from './../../services/student.service';
import { CourseModel } from 'src/app/core/models/course.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

	constructor (private studentService: StudentService) {}

	student: any = {};
	courses: any = [];
	saveCourses: any = [];
	fragCourses: any = [];
	page: number = 1;
	numberOfElement: number = 10;
	
	ngOnInit(): void {

		this.studentService.getStudent().subscribe(s => {
			s.forEach(ss => {
				this.student = ss.payload.doc.data();
			})
			
			this.studentService.getStudentCourses(this.student.level).subscribe(s => {
				this.courses = [];
				
				s.forEach(ss => {
					console.log(ss);
					
					//@ts-ignore
					if (ss.payload.doc.data().option === this.student.option)
						this.courses.push(ss.payload.doc.data());
				})
				this.saveCourses = this.courses;
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

		this.page = 0;

		if (search) {

			this.saveCourses = this.courses.filter((course: any) => {
			
			for (const [key, value] of Object.entries(course)) {
				//@ts-ignore
				if (search.toUpperCase().search(value.toString().toUpperCase()) != -1){
					return true;
				}
			}
  
			return false;
			});
		} else {
			this.saveCourses = this.courses;
		}

		if (!this.saveCourses)
			this.saveCourses = this.courses;

		this.fragCourses = this.getListFragment();
	}

	getListFragment () {
		this.page = 0;
		this.fragCourses = [];
		let i = 0;
		while(i < this.saveCourses.length && i < (this.page) * this.numberOfElement) {
			this.fragCourses.push(this.saveCourses[i])
			i++;
		}
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
