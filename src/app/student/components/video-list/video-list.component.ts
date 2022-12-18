import { StudentService } from './../../services/student.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent {

	constructor (private studentService: StudentService) {}
	@Input() idVideos: string [] = [];

	ngOnInit () {
		this.studentService.getCoursesVideo(this.idVideos)
	}
}
