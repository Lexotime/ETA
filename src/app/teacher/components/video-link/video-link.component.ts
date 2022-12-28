import { ActivatedRoute } from '@angular/router';
import { TeacherService } from './../../services/teacher.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-link',
  templateUrl: './video-link.component.html',
  styleUrls: ['./video-link.component.css']
})
export class VideoLinkComponent implements OnInit {

	constructor( private teacherService: TeacherService, private router: ActivatedRoute) {}
	
	courses: any = [];
	video: any = {};

	ngOnInit(): void {
		let id = this.router.snapshot.params['id'];
		this.teacherService.getVideo(id).subscribe(s => {
			s.forEach(ss => {
				this.video = ss.payload.doc.data();
			});

			this.teacherService.getCoursesVideo(this.video.course).subscribe(v => {
				this.courses = [];
				s.forEach(vv => {
					this.courses.push(vv.payload.doc.data());
				})
			})
		})

		
	}
}
