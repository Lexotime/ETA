import { filter } from 'rxjs';
import { STUDENTS } from './../../../data/dummy';
import { Component } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  students: any = STUDENTS;
  currentStudent: any = this.students[0];
  columns: {name: string, value: string}[] =[
    {name: 'firstname', value: 'prénom'},
    {name: 'lastname', value: 'nom'},
    {name: 'email', value: 'email'},
    {name: 'status', value: 'etat'},
  ];
  item: number = 0;

  getItem (event: any) {

    this.currentStudent = this.students.filter((item: any) => (item.id === event))
  }

  onBlocked (item : boolean) {
  
  }
}
