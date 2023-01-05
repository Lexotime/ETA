import { filter } from 'rxjs';
import { environment } from './../../../environments/environment';
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
	
	
	level: any = environment.level;
	cuLevel: any = environment.level[0];
	
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
				level: [this.cuLevel.name, Validators.required],
				option: [this.cuLevel.option[0], Validators.required],
				name: [, Validators.required],
				description: ['', Validators.required],
			}
		)
	}

	changeLevel(e: any) {
		this.cuLevel = this.level.filter((l: any) => (l.name === e.target.value))[0]		
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
