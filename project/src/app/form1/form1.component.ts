import { CommonServiceService } from './../common-service.service';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component {
  cnicPassport:string="";
  firstName:any;
  middleName:any;
  lastName:any;
  fullName:any;
  fathersName:any;
  Age:any;
  NIC:any;
  passportNumber:any;
  payload:any;
  apiResponse:any;
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
      "cnicPassport":this.cnicPassport,
      "firstName":this.firstName,
      "middleName":this.middleName,
      "lastName":this.lastName,
      "fullName":this.fullName,
      "fathersName":this.fathersName,
      "Age":this.Age,
      "NIC":this.NIC,
      "passportNumber":this.passportNumber
    }
  }
  submit(){
    
    console.log(this.cnicPassport);
    //provide your endpoint here
   
    let endpoint="http://localhost:8080/pv/api/infoByCnicPassport/" + this.cnicPassport;

   this.commonService.getData(endpoint).subscribe(res=>{
     console.log(res);
     
     var jsonResult = JSON.parse(JSON.stringify(res));
     console.log(jsonResult);
     this.firstName = jsonResult['firstName'];
     this.middleName = jsonResult['middleName'];
     this.lastName = jsonResult['lastName'];
     this.fullName = this.firstName + this.middleName + this.lastName;
     this.fathersName = jsonResult['fatherName'];
    });;
    
  }
  constructor(private breakpointObserver: BreakpointObserver,
    public commonService:CommonServiceService) {}
}
