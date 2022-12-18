import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

	@Input() title!: string;
	@Input() message!: string;
	
	icons!: [
		{name: 'warning', value: ''},
		{name: 'validate', value: ''},
		{name: 'error', value: ''},
	];
	@Input() icon!: string;
	@Output() action = new EventEmitter<boolean>();

	@Input() visible: boolean =false;

	ngOnInit () {

	}

	emitResponse (response: boolean) {
		this.action.emit(response);
	}


}
