import { Component, Input } from '@angular/core';
import { CourseModel } from '../../models/course.model';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})

export class CourseItemComponent {

  @Input() course!: any;
  
  isLinkHover: boolean = false;
  
  onHoverLink ()  {
    this.isLinkHover= true;
  }

  onMouseOut () {
    this.isLinkHover = false;
  }
}
