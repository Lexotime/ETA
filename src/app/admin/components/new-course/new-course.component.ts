import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-new-course',
	templateUrl: './new-course.component.html',
	styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {

	courseForm!: FormGroup;
	newForm!: FormGroup;
	newCourse: boolean = false;

	teacher!: string;
	errorMessage!: string;

	columns: {name: string, value: string}[] =[
		{name: 'firstname', value: 'nom'},
		{name: 'lastname', value: 'prenom'},
		{name: 'email', value: 'email'},
		{name: 'status', value: 'etat'},
	];
	
	
	level: {name: string, value: string}[] = [
		{name: 'CI', value: 'CI'},
		{name: 'CP', value: 'CP'},
		{name: 'CE1', value: 'CE1'},
		{name: 'CE1', value: 'CE1'},
		{name: 'CM1', value: 'CM1'},
		{name: 'CM2', value: 'CM2'},
		{name: '6e', value: '6éme'},
		{name: '5e', value: '5éme'},
		{name: '4e', value: '4éme'},
		{name: '3e', value: '3éme'},
		{name: 'Second', value: 'Second'},
		{name: 'Première', value: 'Première'},
		{name: 'Terminale', value: 'Terminale'},
	]
	
	option = [
		{name: 'néan', value: 'néan'},
		{name: 'L', value: 'L'},
		{name: 'S', value: 'S'},
	]
	
	days: string[] = [
		'Lundi',
		'Mardi',
		'Mercredi',
		'Jeudi',
		'Vendredi',
		'Samedi',
	]
	
	hours: string[] = [
		'8h-10h',
		'10h-12h',
		'15h-17h',
		'17h-19h',
		'20h-22h',
	];

	constructor (
		private formBuilder: FormBuilder,
		private router: Router,
		private adminService: AdminService
	) 
	{ }
	
	ngOnInit(): void {
		this.initNewForm();
	}

	initNewForm() {
		this.newForm = this.formBuilder.group(
			{
				day: ['Lundi', Validators.required],
				hours: ['8h-10h', Validators.required],
				level: ['CI', Validators.required],
				option: ['none', Validators.required],
				name: [, Validators.required],
				description: ['', Validators.required],
			}
		)
	}



	onSubmit() {
		let course = {...this.newForm.value};
		
		this.adminService.createCourse(course).then(res => {
			this.router.navigate(["/admin/cours"])
		}, err => {
		});
		this.initNewForm();
	}
}
