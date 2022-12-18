import { EventEmitter } from '@angular/core';
import { AdminService } from './../../services/admin.service';
import { Component, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { TeacherModel } from 'src/app/core/models/teacher.model';
@Component({
	selector: 'app-add-teacher',
	templateUrl: './add-teacher.component.html',
	styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent {

	@Output() teacher = new EventEmitter<TeacherModel>();

	level: {name: string, value: string}[] = [
		{name: 'CI', value: 'CI'},
		{name: 'CP', value: 'CP'},
		{name: 'CE1', value: 'CE1'},
		{name: 'CE1', value: 'CE1'},
		{name: 'CM1', value: 'CM1'},
		{name: 'CM2', value: 'CM2'},
		{name: '6e', value: '6e'},
		{name: '5e', value: '5e'},
		{name: '4e', value: '4e'},
		{name: '3e', value: '3e'},
		{name: 'Second', value: 'Second'},
		{name: 'Première', value: 'Première'},
		{name: 'Terminale', value: 'Terminale'},
	]
	courses: string[] = [
		'Math',
		'Francais',
		'Anglais',
	]

	language: string[] = [
		'francais', 'anglais', 'espagnol'
	]


		// @ts-ignore
		form: FormGroup;
		
		errorMessage: any;
		// @ts-ignore
		isAuth: boolean = false;

		constructor(
				private formBuilder: FormBuilder,
				private router: Router,
				private adminService: AdminService
				) 
		{  
}

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.form = this.formBuilder.group(
			{
				firstname: ['', Validators.required],
				lastname: ['', Validators.required],
				email: ['', [Validators.email, Validators.required]],
				// password: ['', [Validators.required, Validators.pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
			}
		);
	}

	onSubmit() {
		let teacher = {...this.form.value}
		let response = this.adminService.createTeacher(teacher, teacher.email)
		
		response.then((res: any) => {
			this.router.navigate(['/admin/enseignants']);
		}, (err: any) => {
			if (err.message.search('(auth/email-already-in-use)'))
				this.errorMessage = "Vous ne pouvez pas ajouter cet enseignant.";
			else
				this.errorMessage = "Une erreur c'est produit veuillez ressayer";
		})
	}
}
