import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { VIDEOS, COURSES } from './../../../data/dummy';
import { CourseModel } from 'src/app/core/models/course.model';
import { TeacherModel } from './../../../core/models/teacher.model';
// import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { TEACHER } from 'src/app/data/dummy';
import { filter } from 'rxjs';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  courseForm!: FormGroup;

  teachers: TeacherModel[] = TEACHER;
  currentTeacher!:  TeacherModel;
  courses: CourseModel[] = COURSES;
  currentCourse!: CourseModel;
  currentVideo!: any;
  videos:any = VIDEOS;

  newTeacher!: TeacherModel;

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
    'Math',
    'Francais',
    'Anglais',
  ]

  language: string[] = [
    'francais', 'anglais', 'espagnol'
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
    '17hh-19h',
    '20hh-22h',
  ]

  getNewTeacher(teacher: TeacherModel) {
    this.newTeacher = teacher;
    this.teachers.push({...teacher, id: (this.teachers.length + 1).toString()})
    console.log(this.newTeacher);
    
  }

  item: number = 0;

  constructor (
    private formBuilder: FormBuilder,
  ) 
  { }

  ngOnInit(): void {
    this.initForm();
    this.currentTeacher = this.teachers[0];
    this.currentCourse = this.getTeacherCourses()[0];
    this.getCourseVideos(this.currentCourse.id);
  }

  initForm() {
    this.courseForm = this.formBuilder.group(
        {
            day: ['', Validators.required],
            hours: ['', Validators.required],
            level: ['', Validators.required],
            course: ['', Validators.required],
            language: ['', Validators.required],
            description: ['', Validators.required]
        }
    );
}


  // getTeachers() {
  //   this.adminService.getTeachers()
  //   .subscribe((res: any) => {
  //     console.log(res);
      
  //   });
  //   console.log(this.teachers);
    
  // }

  getItem (id: any) {
    this.currentTeacher = this.teachers.filter((teacher: TeacherModel) => (teacher.id === id))[0];
    this.currentCourse= this.courses.filter((course: CourseModel) => (this.currentTeacher.courses[0] === course.id))[0];
    this.getCourseVideos(this.currentCourse.id);
  }

  getTeacherCourses () : CourseModel [] {
    return this.courses.filter((course: CourseModel) => (course.teacher === this.currentTeacher.id))
  }

  getCourseVideos(id: string) {
    this.currentCourse = this.courses.filter((course: CourseModel) => (course.id === id))[0];
    this.currentVideo = this.videos.filter((video: any) => (video.course === this.currentCourse.id));
  }


}
