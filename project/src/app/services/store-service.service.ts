import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreServiceService {

  private showMenu:Boolean=false;
  constructor() { }

  // showMenu() {
  //   if (this.login) {
  //     this.login = false;
  //   } else if (!this.login) {
  //     this.login = true;
  //   }
  // } 
  public getShowMenu(){
    return this.showMenu;
  }
  public setShowMenu(val:any){
    this.showMenu=val;
  }
}
