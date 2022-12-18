import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from './../../services/admin.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css']
})
export class AddVideoComponent  implements OnInit{

	course: any = {name: '', level: ''};

	form!: FormGroup;
	file!: FormData;
	

	constructor (private formBuilder: FormBuilder, private adminService: AdminService, private route: ActivatedRoute, private router: Router) {}

	ngOnInit () {
		this.initForm();
		this.route.params.subscribe(params => {
			let id = params['id'];

			this.adminService.getItem(id, 'Courses').subscribe((s: any) => {
				this.course = s.docs[0].data();
			})
		})
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
		//@ts-ignore
		let name = this.form.get('name').value
		//@ts-ignore
		let description = this.form.get('description').value
		//@ts-ignore
		let file = this.form.get('file').value
		this.adminService.createVideo({name: name, description: description, course: this.course.id, id: ''}, this.course.id, file);
		this.router.navigate(['/admin/videos']);
	}

	onFileSelect (event: any) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			//@ts-ignore
			this.form.get('file').setValue(file);
		}
	}
}
