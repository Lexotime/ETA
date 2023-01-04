import { TeacherService } from './../../services/teacher.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	constructor(
		private formBuilder: FormBuilder,
		private router: ActivatedRoute,
		private teacherService: TeacherService
		) 
{  }

	teacher!: any;
	code!: string;

	ngOnInit(): void {
		this.code = this.router.snapshot.queryParams['oobCode'];
		console.log(this.code);
		
		if (this.code)
			this.modifier = true;


		this.teacherService.getTeacher().subscribe(s => {
			s.forEach(ss => {
				this.teacher = ss.payload.doc.data();
			})
			this.initForm(this.teacher);
		})
		this.initPasswordForm();
	}

	form = new FormGroup({
		firstname: new FormControl(),
		lastname: new FormControl(),
		email: new FormControl(),
	});

	formPassword= new FormGroup({
		password: new FormControl(),
		confirmPassword: new FormControl(),
	});

	errorMessage: any;

	isAuth: boolean = false;
	modifier: boolean = false;

	initForm(teacher: any) {
		this.form = this.formBuilder.group(
			{
				firstname: [{value: teacher.firstname, disabled: true}, Validators.required],
				lastname: [{value :teacher.lastname, disabled: true}, Validators.required],
				email: [{value : teacher.email, disabled: true},  ],
			}
		);
	}

	initPasswordForm () {
		this.formPassword = this.formBuilder.group(
			{
				password: [{value : "", disabled: !this.modifier}, [Validators.required, Validators.pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
				confirmPassword: [{value : "", disabled: !this.modifier}, Validators.required],
			}
		);
	}


	submitPassword() {
		let id = "";
		let password = this.formPassword.get("password")?.value;
		let confirmPassword = this.formPassword.get("password")?.value;

		if (password !== confirmPassword) {

			return;
		}
		console.log(this.teacher);
		
		
		this.teacherService.updatePassword(this.teacher.uid, password).then(res => {
			
		}).catch(err => {
			
		})
	}
}
