import { CommonServiceService } from './../common-service.service';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient,HttpParams } from '@angular/common/http';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { HttpHeaders } from '@angular/common/http';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-visaapproval',
  templateUrl: './VisaApproval.component.html',
  styleUrls: ['./VisaApproval.component.css']
})
export class VisaApprovalComponent {
  columns=['Citizen Name','Foreign Visa Agency','Country','Visa Status','Visa Type',
  'Visa Requested Date','Visa Issue Date','Visa Expiry Date','Document','Action']

  rows=[
    {
      foreignVisaAgencyName : "",
      citizenName : "",
      statusValue : "",
      visaTypeValue : "",
      issuanceDate : "",
      issuanceExpiry:"",
      id:"",
      createDateTime:"",
      countryValue:"",
      visaCountryValue:"",
      passportFilePath:"",
      visaFilePath:""
    }
  ]
  foreignVisaAgencyName:any;
  citizenName:any;
  statusValue:any;
  visaTypeValue:any;
  issuanceDate:any;
  issuanceExpiry:any;
  payload:any;
  id:any;
  createDateTime:any;
  visaCountryValue:any;
  bodyText:any;
  passportFilePath:any;
  visaFilePath:any;
  
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
      "foreignVisaAgencyName":this.foreignVisaAgencyName,
      "citizenName":this.citizenName,
      "statusValue":this.statusValue,
      "visaTypeValue":this.visaTypeValue,
      "passportIssuanceDate":this.issuanceDate,
      "issuanceExpiry":this.issuanceExpiry,
      "id":this.id,
      "passportFilePath":this.passportFilePath
    }
  }

  ngOnInit(){
    this.submit();
  }
  submit(){
    // this.getPayload();
    //provide your endpoint here
    let endpoint="http://localhost:8080/pv/api/findAllPvCitizenVisa";

   this.commonService.getData(endpoint).subscribe(res=>{
     var jsonResult = JSON.parse(JSON.stringify(res));
     this.rows = jsonResult;

     console.log(this.rows);
     
    });;
  }

  updateVisaData(id: any, status: any, passportFilePath: any) {
    console.log("Recieved call at updateVisaData() method : " + id);
    console.log("Status: " + status);
    console.log("Passport File Path: " + passportFilePath);

    let params = new HttpParams();
    params = params.append('citizenVisaId', id);
    params = params.append('status', status);
    params = params.append('passportFilePath', passportFilePath);

    console.log("Http Params: " + params);
    let endpoint="http://localhost:8080/pv/api/updateVisaStatus?"+params;
    
    this.commonService.postDataWithQueryParam(endpoint, params).subscribe(res=>{
      console.log(res);

      if (res == '200') {
        this.bodyText = 'Visa approved and stamped in passport'
      } else if (res == '404') {
        this.bodyText = 'Passport is not found for citizen'
      } else if (res == '403') {
        this.bodyText = 'Visa rejected'
      }
      
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