import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {


  item: number = 0;

  getItem (event: any) {
    this.item = event;
  }
}
