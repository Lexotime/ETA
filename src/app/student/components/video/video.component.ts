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
	

	constructor( private studentService: StudentService, private router: ActivatedRoute) {}

	ngOnInit(): void {
		this.studentService.getStudent().subscribe(s => {
			s.forEach(ss => {
				this.student = ss.payload.doc.data();
			})
			
			this.studentService.getStudentCourses(this.student.courses).subscribe(s => {
				this.courses = [];
				s.forEach(ss => {
					this.courses.push(ss.payload.doc.data());
					
				})

				let tmp = this.courses.reduce((r: any, o: any) => {
					r[o.name] = r[o.name] || []
					r[o.name].push(o)
					return r;
				},
					Object.create(null)			
				);
				let result: any = [];
				Object.keys(tmp).forEach(k => {
					result.push(
						tmp[k].map((v: any) => ({name: k, data: v}))
					);
				})
				this.courses = result;	
			})
		})
	}


	getEvent(event: any) {
		
	}
}
