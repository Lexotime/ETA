import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.css']
})
export class CoursesListItemComponent implements OnInit {

	@Input() name!: string;
	@Input() data!: any;
	@Input() courses: any = [];
	@Output() event = new EventEmitter<string>()

	saveArray: any = [];

	ngOnInit () {

	}

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
