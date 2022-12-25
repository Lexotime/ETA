import { FormControl } from '@angular/forms';
import { AdminService } from './../../services/admin.service';
import { CourseModel } from './../../../core/models/course.model';
import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit{

	courseForm = new FormGroup( {
		level: new FormControl(),
		name: new FormControl(),
		option:new FormControl()
	});
	newCourse: boolean = false;

	teacher: any = {};
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

	option: {name: string, value: string}[] = [
		{name: 'S', value: 'S'},
		{name: 'L', value: 'L'},
		{name: 'néan', value: 'none'}
	]

	coursesList: any[] = []
	courses: any[] = []
	
	
	constructor (
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private adminService: AdminService
	) 
	{ }
	
  	ngOnInit(): void {
		this.initForm();

		this.adminService.getAllCourses().subscribe(s => {
			this.coursesList = [];
			s.forEach( (ss: any) => {
				let course: any = {...ss.payload.doc.data(), uid: ss.payload.doc['id']};
				this.coursesList.push(course);
			})	
		})

		this.route.params.subscribe(params => {
			let id = params['id'];
			this.adminService.getItem(id, 'Teachers').subscribe((s: any) => {
				this.teacher = s.docs[0].data();
			})
		})
	}

	initForm () {
		this.courseForm = this.formBuilder.group({
			name: [, Validators.required],
			level: ['CI', Validators.required],
			option : ['none', Validators.required]
		})
	}
	
	filter() {
		return this.coursesList.filter((course: any) => (course.option == this.courseForm.get('option')?.value && course.level == this.courseForm.get('level')?.value && !course.teacher))
	}

	onSubmit() {
		
		if (this.teacher && this.courseForm.get("name")?.value) {
			this.adminService.updateCourseTeacher(this.teacher.id, this.courseForm.get("name")?.value, this.teacher.firstname+" "+this.teacher.lastname)
			.then(res => {
				console.log(res);
				this.router.navigate(["/admin/enseignants"]);
			}).catch (err => {
				console.log(err);
				
			})			
		}
	}
}
