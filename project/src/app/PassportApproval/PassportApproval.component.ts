import { CommonServiceService } from './../common-service.service';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient,HttpParams } from '@angular/common/http';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { HttpHeaders } from '@angular/common/http';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-passportapproval',
  templateUrl: './PassportApproval.component.html',
  styleUrls: ['./PassportApproval.component.css']
})
export class PassportApprovalComponent {
  columns=['Passport Branch Name','Citizen Name','Passport Status','Passport Type','Passport Issuance Date','Passport Expiry Date','Action']

  rows=[
    {
      passportBranchName : "",
      citizenName : "",
      statusValue : "",
      passportTypeValue : "",
      issuanceDate : "",
      issuanceExpiry:"",
      id:""
    }
  ]
  passportBranchName:any;
  citizenName:any;
  statusValue:any;
  passportTypeValue:any;
  issuanceDate:any;
  issuanceExpiry:any;
  payload:any;
  id:any;
  bodyText:any;
  
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
      "id":this.id
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
     var jsonResult = JSON.parse(JSON.stringify(res));
     this.rows = jsonResult;

     console.log(this.rows);
    });;
  }

  updatePassportData(id: any, status: any) {

    console.log("Recieved call at updatePassportData() method : " + id);
    console.log("Status: " + status);

    let params = new HttpParams();
    params = params.append('citizenPassportId', id);
    params = params.append('status', status);

    console.log("Http Params: " + params);
    let endpoint="http://localhost:8080/pv/api/updatePassportData?"+params;
    
    this.commonService.postDataWithQueryParam(endpoint, params).subscribe(res=>{
      console.log(res);

      this.bodyText = 'Passport status updated.'
      this.openModal('custom-modal-1');
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