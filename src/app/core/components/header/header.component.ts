import { Component, ViewChild, ElementRef, Renderer2, SimpleChanges, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {

	@ViewChild('toggleButton') toggleButton!: ElementRef ;
	@ViewChild('menu') list!: ElementRef ;
	@ViewChild('tF') tF!: ElementRef ;
	@ViewChild('tF1') tF1!: ElementRef ;
	@Input() sideVisible!: boolean;

	screenSize!: number;
	constructor(private renderer: Renderer2) {
		
		this.renderer.listen('window', 'click',(e:Event)=>{
			if(e.target !== this.toggleButton.nativeElement && e.target!==this.list.nativeElement && e.target!==this.tF.nativeElement && e.target!==this.tF1.nativeElement){
					this.isOpen=false;
			}
		});

		this.renderer.listen('window', 'resize',(e:Event)=>{
			this.screenSize = window.innerWidth;
		});
	}


	ngOnInit() {
		this.screenSize = window.innerWidth;
		
	}

	aLinks: {name: string, href: string}[] = [
		{name: 'Etudiant', href: 'admin/etudiants'},
		{name: 'Enseignant', href: 'admin/enseignants'},
	] ;


	tLinks: {name: string, href: string}[] = [
		{name: 'Accueil', href: 'en/cours'},
		{name: 'Emploi du temps', href: 'en/activite'},
		{name: 'Mes Videos', href: 'en/videos'}
	];


	sLinks: {name: string, href: string}[] = [
		{name: 'Accueil', href: 'etud/accueil'},
		{name: 'Mes cours', href: 'etud/cours'},
		{name: 'Emploi du temps', href: 'etud/activite'},
		{name: 'Rediffusion', href: 'etud/rediffusion'},
	];
 


	isAuth (): boolean {
		return localStorage.getItem('login') ? true : false;
	}
	
	getUser() : string | null{
		return localStorage.getItem('user');
	}

	onLogout () {
		localStorage.clear();
	}

	onClose () {
		this.isOpen = false;
	}

	isOpen: boolean = false;

	onDrop (open: boolean)  {
		this.isOpen = open;
	}
}
