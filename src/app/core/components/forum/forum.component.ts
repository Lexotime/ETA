import { Router } from '@angular/router';
import { ForumService } from './../../services/forum.service';
import { Component, Input, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

	courses: any = [];
	user: any = {};
	course: any = {};
	messages: any = [];
	screenSize!: number;

	chatroomVisible: boolean = false;



	@ViewChild("text") text!: ElementRef<any>;

	constructor (private  forumService: ForumService,private renderer: Renderer2, private router: Router) {
		this.renderer.listen('window', 'resize',(e:Event)=>{
			this.screenSize = window.innerWidth;
		});
	}

	ngOnInit(): void {
		this.screenSize = window.innerWidth;

		this.forumService.getUser()?.subscribe(s => {
			s.forEach(ss => {
				this.user = ss.payload.doc.data()
			})
			if (this.user) {
				if (localStorage.getItem("us") === "st7865mt")
					this.forumService.getStudentCourses(this.user.level).subscribe(c => {
						this.courses = [];
						c.forEach(cc => {
							this.courses.push(cc.payload.doc.data())
						})
						if (this.courses[0])
							this.getMessages(this.courses[0])					
					})
				else if (localStorage.getItem("us") === "te12sdz")
					this.forumService.getTeacherCourses(this.user.id).subscribe(c => {
						this.courses = [];
						c.forEach(cc => {
							this.courses.push(cc.payload.doc.data())
						})
						if (this.courses[0])
							this.getMessages(this.courses[0])					
					})
				else 
					this.router.navigate(['/'])
			} else {
				this.router.navigate(['/'])
			}
			
		});
		
	}

	getMessages (course: any) {
		this.course = course;
		this.forumService.getMessages(course.id).subscribe(s => {
			this.messages = [];
			s.forEach(ss => {
				this.messages.push(ss.payload.doc.data());
			})

			this.messages.sort((a: any,b: any) => {
				return a.num > b.num ? -1 : 1
			})
			this.chatroomVisible = false;
		})
	}

	sendMessage (message: string) {
		if (message && this.course && this.user) {
			let userName;
			if (this.user.name)
				userName = this.user.name;
			else
				userName = this.user.firstname+" "+this.user.lastname;

			this.forumService.addMessage({message,	 course: this.course.id, userName, user: this.user.id, num: this.messages.length}).then( res => {
				console.log(res);
				this.text.nativeElement.value = "";
			}, err => {
				console.log(err);
				
			})
		}
	}

	setVisible(chatroomVisible: boolean) {
		this.chatroomVisible = chatroomVisible;
	}

}
