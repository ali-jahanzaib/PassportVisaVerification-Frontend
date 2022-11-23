import { CommonServiceService } from './../common-service.service';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-form4',
  templateUrl: './form4.component.html',
  styleUrls: ['./form4.component.css']
})
export class Form4Component {
  cnicPassport:string="";
  payload:any;
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: '', cols: 2, rows: 1 },
        ];
      }

      return [
        { title: '', cols: 2, rows: 1 },
      ];
    })
  );
  getPayload(){
    this.payload={
      "cnicPassport":this.cnicPassport
    }
  }
  submit(){
    // this.getPayload();
    console.log(this.cnicPassport);
    //provide your endpoint here
    let endpoint="http://localhost:8090/citizen/infoByCnicPassport/" + this.cnicPassport;

   this.commonService.getData(endpoint).subscribe(res=>{
     console.log(res);
    });;
    
  }
  constructor(private breakpointObserver: BreakpointObserver,
    public commonService:CommonServiceService) {}
}
