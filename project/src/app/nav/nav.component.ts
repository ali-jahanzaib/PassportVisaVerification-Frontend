import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterLink } from '@angular/router';
import { StoreServiceService } from '../services/store-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  login:any;
  check=false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    ngOnInit(): void {
      
      this.login=this.storeService.getShowMenu();
      // console.log(" NgOnInit called for Navigation " + this.login)
    }
  constructor(private breakpointObserver: BreakpointObserver,private storeService:StoreServiceService) {}

  checkTrue(){
    this.check=true;
  }
  checkFalse(){
    this.check=false
  }


  temporaryDisabled: boolean = false;


}
