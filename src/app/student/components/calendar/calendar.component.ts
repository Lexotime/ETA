import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  daysEvents: {name: string, events: {date: string, teacher:string, course:string, link: string}[]}[] = [
    {name: 'Lundi', events: [
      {link: '', date: 'string', teacher:'string', course:'string'},
      {link: '', date: 'string', teacher:'string', course:'string'},
      {link: '', date: 'string', teacher:'string', course:'string'}
    ]},
    {name: 'Mardi', events: [
      {link: '', date: 'string', teacher:'string', course:'string'},
      {link: '', date: 'string', teacher:'string', course:'string'},
      {link: '', date: 'string', teacher:'string', course:'string'}
    ]},
    {name: 'Mercredi', events: [
      {link: '', date: 'string', teacher:'string', course:'string'},
      {link: '', date: 'string', teacher:'string', course:'string'},
      {link: '', date: 'string', teacher:'string', course:'string'}
    ]}
  ]
}
