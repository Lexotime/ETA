import { Component, Renderer2, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  	title = "Étoiles d'afrique";

	isAuth () : boolean {
		return localStorage.getItem('li') ? true : false;
	}
	screenSize!: number;
	sideVisible = false;

	ngOnInit(): void {
		this.screenSize = window.innerWidth;
		
	}

	constructor (private renderer: Renderer2) {
		this.renderer.listen('window', 'resize',(e:Event)=>{
			this.screenSize = window.innerWidth;
		});
	}

	getVisible (event: boolean) {
		this.sideVisible = event		
	}

}
