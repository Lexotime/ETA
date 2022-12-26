import { TeacherService } from './../../services/teacher.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {

	video: any = {};
	courses: any = [];
  teacher: any = {};

	constructor (private router: ActivatedRoute, private teacherService: TeacherService) {}

	ngOnInit(): void {
		let id = this.router.snapshot.params['id'];

    this.teacherService.getTeacher().subscribe(s => {

      s.forEach(ss => {
        this.teacher = ss.payload.doc.data();
      })

      this.teacherService.getTeacherCourses(this.teacher.id).subscribe(v => {
        this.courses = [];
				v.forEach(vv => {
					
					this.courses.push(vv.payload.doc.data())
				})
			})
    })

		this.teacherService.getVideo(id).subscribe(s => {
			s.forEach(ss => {
				this.video = ss.payload.doc.data();
			});
		})
	}

	filter (search: string) {

	}
}
