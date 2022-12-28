import { Component } from '@angular/core';
import { CommonServiceService } from './../common-service.service';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {FormControl, Validators} from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component {
  columns=['Citizen Name','Passport Branch Name','Passport Status','Passport Number','Passport Type','Passport Issuance Date','Passport Expiry Date','Passport Document']

  rows=[
    {
      citizenName : "Ali",
      passportBranchName : "America",
      statusValue : "Expired",
      passportTypeValue : "VIP",
      issuanceDate : "",
      issuanceExpiry:"",
      passportNumber:"",
      passportFilePath:""
    }
  ]
  passportBranchName:any;
  citizenName:any;
  statusValue:any;
  passportTypeValue:any;
  issuanceDate:any;
  issuanceExpiry:any;
  payload:any;
  passportNumber:any;
  passportFilePath:any;
  
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
    
    //provide your endpoint here
    let endpoint="http://localhost:8080/pv/api/findAllPvCitizenPassport/";

   this.commonService.getData(endpoint).subscribe(res=>{
     
     var jsonResult = JSON.parse(JSON.stringify(res));
     this.rows = jsonResult;
     console.log(this.rows);
    });;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }
  constructor(private breakpointObserver: BreakpointObserver,
    public commonService:CommonServiceService,
    private modalService: ModalService) {}
}
