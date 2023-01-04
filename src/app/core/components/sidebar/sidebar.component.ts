import { Component, OnInit, Renderer2, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	aLinks: {name: string, href: string}[] = [
		{name: 'Etudiant', href: 'admin/etudiants'},
		{name: 'Enseignant', href: 'admin/enseignants'},
		{name: 'Cours', href: 'admin/cours'},
		{name: 'Vidéos', href: 'admin/videos'},
	] ;
	
	
	tLinks: {name: string, href: string}[] = [
		{name: 'Accueil', href: 'en/accueil'},
		{name: 'Emploi du temps', href: 'en/activite'},
		{name: 'Mes Videos', href: 'en/videos'},
		{name: 'Profil', href: 'en/profil'}
	];
	
	
	sLinks: {name: string, href: string}[] = [
		{name: 'Accueil', href: 'etud/accueil'},
		{name: 'Emploi du temps', href: 'etud/activite'},
		{name: 'Vidéos', href: 'etud/videos'},
		{name: 'Profil', href: 'etud/profil'}
	];
	
	screenSize!: number;

	@ViewChild('sideBar') toggleButton!: ElementRef ;
	@ViewChild('sideMenu') list!: ElementRef ;
	@Output() visible = new EventEmitter<boolean>();

	constructor (private renderer: Renderer2) {
		this.renderer.listen('window', 'resize',(e:Event)=>{
			this.screenSize = window.innerWidth;
		});

		this.renderer.listen('window', 'click',(e:Event)=>{
			if (this.toggleButton)
				if(e.target !== this.toggleButton.nativeElement && e.target!==this.list.nativeElement){
					this.isOpen=false;
					console.log(e.target);
					
				}
		});
	}


	sideVisible: boolean = false;
	isOpen: boolean = false;

	ngOnInit(): void {
		this.screenSize = window.innerWidth;
		this.visible.emit(this.sideVisible);
	}

	setSide () {
		this.sideVisible = !this.sideVisible;
		this.visible.emit(this.sideVisible)
	}

	onOpen (open: boolean) {
		console.log(open);
		
		this.isOpen = open;
	}
	
	isAuth (): boolean {
		return localStorage.getItem('login') ? true : false;
	}
	  
	getUser() : string | null{
			return localStorage.getItem('user');
	}
}
