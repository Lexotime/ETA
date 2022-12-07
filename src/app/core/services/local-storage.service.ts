import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  
  constructor () { }

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
