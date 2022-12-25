import { Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  
  screenSize!: number;
	constructor (private renderer: Renderer2) {
		this.renderer.listen('window', 'resize',(e:Event)=>{
			this.screenSize = window.innerWidth;
		});
	}

  getLocalData (dataName: string) : string | null{
    return localStorage.getItem(dataName);
  }



  setLocalData (dataName: string, data: string) {
    localStorage.setItem(dataName, data)
  }

  clearLocalData () {
    localStorage.clear();
  }
}
