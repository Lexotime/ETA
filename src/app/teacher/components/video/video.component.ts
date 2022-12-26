import { ActivatedRoute } from '@angular/router';
import { TeacherService } from './../../services/teacher.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

	currentLink: string = "CI";
	courses: any = [];
	teacher: any;
	message: string = "";
	fragCourses: any = [];
	page: number = 1;
	numberOfElement: number = 10;

	constructor( private teacherService: TeacherService, private router: ActivatedRoute) {}

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
			})
		})
	}

	getCourseVideos (idCourse: string) {
		let videos
	}

	getEvent(event: any) {
		
	}

	filter (search: string) {

	}

	previous () {

	}

	next () {

	}
}
