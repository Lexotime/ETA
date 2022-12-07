import { Component } from '@angular/core';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent {

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
}
