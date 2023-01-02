import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterLink, Router } from '@angular/router';
import { StoreServiceService } from '../services/store-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  login:any;
  check=false;
  portal = {
    passport: '4201',
    citizen: '4202',
    visa1: '4203',
    visa2: '4204',
    immigration1: '4205',
    immigration2: '4206',
  };
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    ngOnInit(): void {
      
      this.login=this.storeService.getShowMenu();
      // console.log(" NgOnInit called for Navigation " + this.login)
    }
  constructor(private router: Router, private breakpointObserver: BreakpointObserver,private storeService:StoreServiceService) {}

  checkTrue(){
    this.check=true;
  }
  checkFalse(){
    this.check=false
  }

  showLink(port: string): boolean {
    return window.location.href.includes(port);
  }


  temporaryDisabled: boolean = false;


}
