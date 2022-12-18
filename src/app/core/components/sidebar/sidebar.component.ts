import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

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
		{name: 'Mes cours', href: 'etud/cours'},
		{name: 'Emploi du temps', href: 'etud/activite'},
		{name: 'Rediffusion', href: 'etud/rediffusion'},
		{name: 'Profil', href: 'etud/profil'}
	];
	
	
	
	isAuth (): boolean {
		return localStorage.getItem('login') ? true : false;
	}
	  
	getUser() : string | null{
			return localStorage.getItem('user');
	}
}
