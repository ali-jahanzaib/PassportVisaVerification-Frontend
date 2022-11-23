import { Component } from '@angular/core';
import { CommonServiceService } from './../common-service.service';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {FormControl, Validators} from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component {
  columns=['Passport Branch Name','Citizen Name','Passport Status','Passport Type','Passport Issuance Date','Passport Expiry Date']

  rows=[
    {
      passportBranchName : "America",
      citizenName : "Ali",
      statusValue : "Expired",
      passportTypeValue : "VIP",
      issuanceDate : "28-12-2020",
      issuanceExpiry:"28-12-2030"
    }
  ]
  passportBranchName:any;
  citizenName:any;
  statusValue:any;
  passportTypeValue:any;
  issuanceDate:any;
  issuanceExpiry:any;
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
      "passportBranchName":this.passportBranchName,
      "citizenName":this.citizenName,
      "statusValue":this.statusValue,
      "passportTypeValue":this.passportTypeValue,
      "passportIssuanceDate":this.issuanceDate,
      "issuanceExpiry":this.issuanceExpiry,
    }
  }

  ngOnInit(){
    this.submit();
  }
  submit(){
    // this.getPayload();
    //provide your endpoint here
    let endpoint="http://localhost:8080/pv/api/findAllPvCitizenPassport/";

   this.commonService.getData(endpoint).subscribe(res=>{
     console.log(res);

     var jsonResult = JSON.parse(JSON.stringify(res));
     this.rows = jsonResult;

     console.log(this.rows);
    });;
    
  }
  constructor(private breakpointObserver: BreakpointObserver,
    public commonService:CommonServiceService) {}
}
