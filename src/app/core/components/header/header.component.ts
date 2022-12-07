import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

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

  isAuth (): boolean {
    return localStorage.getItem('login') ? true : false;
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
