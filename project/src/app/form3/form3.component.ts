import { CommonServiceService } from './../common-service.service';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-form3',
  templateUrl: './form3.component.html',
  styleUrls: ['./form3.component.css']
})
export class Form3Component {
  cnicPassport:string="";
  firstName:any;
  middleName:any;
  lastName:any;
  fullName:any;
  fathersName:any;
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
    let endpoint="http://localhost:8080/pv/api/infoByCnicPassport/" + this.cnicPassport;
    
    this.commonService.getData(endpoint).subscribe(res=>{
     console.log(res);
    });;
    
  }
  constructor(private breakpointObserver: BreakpointObserver,
    public commonService:CommonServiceService) {}
}
