import { TeacherService } from './../../services/teacher.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

	days: string[] = [
		'Lundi',
		'Mardi',
		'Mercredi',
		'Jeudi',
		'Vendredi',
		'Samedi',
	]
	
	hours: string[] = [
		'8h-10h',
		'10h-12h',
		'15h-17h',
		'17h-19h',
		'20h-22h',
	];
	
	student: any = {};
	courses: any = [];

	constructor (private teacherService: TeacherService) {}

	ngOnInit () {
		this.teacherService.getTeacher().subscribe(s => {
			s.forEach(ss => {
				this.student = ss.payload.doc.data();
			})
			
			this.teacherService.getTeacherCourses(this.student.courses).subscribe(s => {
				this.courses = [];
				s.forEach(ss => {
					this.courses.push(ss.payload.doc.data());
					
				})
			})
		})
	}

	getCourses (day: string, hours: string) {
		return this.courses.filter((c: any) => (c.hours == hours && day == c.day))
	}
}
