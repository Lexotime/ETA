import { StudentService } from './../../services/student.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-video-list-item',
  templateUrl: './video-list-item.component.html',
  styleUrls: ['./video-list-item.component.css']
})
export class VideoListItemComponent {

	@Input() name!: string;
	@Input() data!: any;
	@Input() courses: any = [];
	@Output() event = new EventEmitter<string>()

	videos: any = [];

	saveArray: any = [];


	next () {
		if (this.data.length > 1)
			this.saveArray.push(this.data.shift());
	}

	previous () {
		if (this.saveArray.length > 0)
			this.data.unshift(this.saveArray.pop());
	}

	emit(id: string) {
		this.event.emit(id);
	}

	haveThisCourse (id: string): boolean {
		let response = false;
		this.courses.forEach( (e: any) => {
			if (id === e)
				response = true;
		});
		return response;
	}
}
