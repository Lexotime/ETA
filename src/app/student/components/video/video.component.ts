import { ActivatedRoute } from '@angular/router';
import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

	currentLink: string = "CI";
	courses: any = [];
	student: any;
	message: string = "";
	fragCourses: any = [];
	page: number = 1;
	numberOfElement: number = 10;
	isLoading: boolean = false;

	constructor( private studentService: StudentService, private router: ActivatedRoute) {}

	ngOnInit(): void {
		this.isLoading= true;
		this.studentService.getStudent().subscribe(s => {
			s.forEach(ss => {
				this.student = ss.payload.doc.data();
			})
			if (this.student.level === undefined) {
				this.isLoading = false;
			}
			this.studentService.getStudentCourses(this.student.level).subscribe(s => {
				this.courses = [];
				
				s.forEach(ss => {
					
					//@ts-ignore
					if (ss.payload.doc.data().option === this.student.option) {
						this.courses.push(ss.payload.doc.data());
						
					}
				})
				this.isLoading= false;

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
