import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  getItem(arg0: string) {
    throw new Error('Method not implemented.');
  }

  localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  get(key:string){
    return this.localStorage.getItem(key);
  }

  set(key:string, value:any){
    this.localStorage.setItem(key,value);
  }

  remove(key:string){
    this.localStorage.removeItem(key);
  }

  clear(){
    this.localStorage.clear();
  }

}