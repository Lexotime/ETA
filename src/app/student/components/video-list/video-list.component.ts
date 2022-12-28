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
	videos: any = [];
	@Input() course!: any;
	fragVideos: any = [];
	page: number = 1;
	numberOfElement: number = 10;

	ngOnInit () {
		
		this.studentService.getCoursesVideo(this.course.id).subscribe(s => {
			this.videos = []
			s.forEach(ss => {
				this.videos.push(ss.payload.doc.data());
			})
			console.log(this.videos);
			
		})
		this.fragVideos = [];
		let i = 0;
		while(i < this.videos.length && i < (this.page) * this.numberOfElement) {
			this.fragVideos.push(this.videos[i])
			i++;
		}
	}

	filter (search: string) {

	}

	next () {
		if (this.videos.length > this.page * this.numberOfElement) {
			this.fragVideos = [];
			let i = this.page * this.numberOfElement;
			while(i < this.videos.length && i < (this.page + 1) * this.numberOfElement) {
				this.fragVideos.push(this.videos[i])
				i++;
			}
			this.page ++;			
		}
	}

	previous () {
		if (this.page > 1) {
			this.page --;
			this.fragVideos = [];
			let i = (this.page - 1) * this.numberOfElement;
			while(i < this.videos.length && i - (this.page - 1) * this.numberOfElement < this.numberOfElement) {
				this.fragVideos.push(this.videos[i])
				i++;
			}
		}
	}
}
