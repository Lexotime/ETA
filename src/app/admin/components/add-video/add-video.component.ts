import { AdminService } from './../../services/admin.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css']
})
export class AddVideoComponent  implements OnInit{

	course!: string;

	form!: FormGroup;
	file!: FormData;
	

	constructor (private formBuilder: FormBuilder, private adminService: AdminService) {}

	ngOnInit () {
		this.initForm();
	}

	initForm () {
		this.form = this.formBuilder.group(
			{
				name: ['', Validators.required],
				description: ['', Validators.required],
				file: ['', Validators.required]
			}
		);
	}

	onSubmit () {

		console.log(this.form.value);
		
	}

	onFileSelect (event: any) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			//@ts-ignore
			this.form.get('file').setValue(file);
		}
	}
}
