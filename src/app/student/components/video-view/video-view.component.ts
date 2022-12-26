import { StudentService } from './../../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {

	video: any = {};
	course: any = {};

	constructor (private router: ActivatedRoute, private studentService: StudentService) {}

	ngOnInit(): void {
		let id = this.router.snapshot.params['id'];
		this.studentService.getVideo(id).subscribe(s => {
			s.forEach(ss => {
				this.video = ss.payload.doc.data();
			});

			this.studentService.getCourse(this.video.course).subscribe(v => {
				v.forEach(vv => {
					
					this.course = vv.payload.doc.data();
				})
			})

		})

		
	}

	filter (search: string) {

	}
}
