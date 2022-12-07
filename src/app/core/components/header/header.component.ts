import { Component, ViewChild, ElementRef, Renderer2, SimpleChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {

  @ViewChild('toggleButton') toggleButton!: ElementRef | undefined;
  @ViewChild('menu') list!: ElementRef | undefined;

  constructor(private renderer: Renderer2) {
    
    if (this.toggleButton)
      this.renderer.listen('window', 'click',(e:Event)=>{
          //@ts-ignore
        if(e.target !== this.toggleButton.nativeElement && e.target!==this.list.nativeElement){
            this.isOpen=false;
        }
      });
  }


  ngOnInit() {
    
    
  }

  aLinks: {name: string, href: string}[] = [
    {name: 'Cours', href: 'admin/cours'},
    {name: 'Etudiant', href: 'admin/etudiants'},
    {name: 'Enseignant', href: 'admin/enseignants'},
    {name: 'Ajouter Enseignant', href: 'admin/ajouter'},
  ] ;


  tLinks: {name: string, href: string}[] = [];


  sLinks: {name: string, href: string}[] = [
    {name: 'Accueil', href: 'etud/accueil'},
    {name: 'Mes cours', href: 'etud/cours'},
    {name: 'Emploi du temps', href: 'etud/activite'}
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
   console.log(open);
   
    this.isOpen = open;
  }
}
