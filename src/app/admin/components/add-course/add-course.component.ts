import { AdminService } from './../../services/admin.service';
import { CourseModel } from './../../../core/models/course.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {

	courseForm!: FormGroup;

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
		{name: '6e', value: '6e'},
		{name: '5e', value: '5e'},
		{name: '4e', value: '4e'},
		{name: '3e', value: '3e'},
		{name: 'Second', value: 'Second'},
		{name: 'Première', value: 'Première'},
		{name: 'Terminale', value: 'Terminale'},
	]
	coursesList: string[] = [
		'Mathématique',
		'Physique Chimie',
		'Science de la vie et de la terre',
		'Philosophie',
		'Informatique',
		'Littérature',
		'Histoire',
		'Géographie',
		'Économie social',
		'Allemand',
		'Français',
		'Anglais',
		'Espagnol',
		'Arabe',
		'Espagnol',
	]
	
	language: string[] = [
		'français', 'anglais', 'espagnol', 'allemand', 'arable'
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
		private route: ActivatedRoute,
		private adminService: AdminService
	) 
	{ }
	
  	ngOnInit(): void {
		this.initForm();
		this.route.params.subscribe(params => {
			let id = params['id'];

			this.adminService.getItem(id, 'Teachers').subscribe((s: any) => {
				console.log(s.docs[0].data())
				this.teacher = s.docs[0].data().email;
				
			})
			console.log(this.teacher);
			
		})
	}

	initForm() {
		this.courseForm = this.formBuilder.group(
			{
				day: ['Lundi', Validators.required],
				hours: ['8h-10h', Validators.required],
				level: ['CI', Validators.required],
				name: ['Mathématique', Validators.required],
				language: ['français', Validators.required],
				description: ['', Validators.required],
				other: ['', ],
			}
		);
	}	

	onSubmit() {
		
		if (this.teacher) {
			let name: string;
			if (this.courseForm.get('name')?.value !== 'other')
				name =this.courseForm.get('other')?.value;
			else 
				name = this.courseForm.get('name')?.value;

			if (!this.courseForm.get('other')?.value && this.courseForm.get('name')?.value == 'other'){
				this.errorMessage = "Formulaire non complet"
				
				return;
			}
			let course = {
				day: this.courseForm.get('day')?.value,
				hours: this.courseForm.get('hours')?.value,
				level: this.courseForm.get('level')?.value,
				name: this.courseForm.get('name')?.value,
				language: this.courseForm.get('language')?.value,
				description: this.courseForm.get('description')?.value,
				teacher: this.teacher,
				picture: 'assets/courses/',
				id: ''
			}

			console.log(this.adminService.createCourse(course));
			

		}
		this.initForm();
	}
}
