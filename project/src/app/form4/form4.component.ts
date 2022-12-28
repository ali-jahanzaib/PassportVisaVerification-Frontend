import { CommonServiceService } from './../common-service.service';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { HttpClient,HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-form4',
  templateUrl: './form4.component.html',
  styleUrls: ['./form4.component.css']
})
export class Form4Component {
  columns=['Citizen Name','Passport Branch Name','Passport Issuing Country', 'Passport Status','Passport Type','Passport Expiry Date','Visa Country','Action']

  rows=[
    {
      passportBranchName : "",
      citizenName : "",
      countryValue : "",
      statusValue : "",
      passportTypeValue : "",
      issuanceDate : "",
      issuanceExpiry:"",
      id:"",
      createDateTime:"",
      pvCitizenId:"",
      visaCountryId:""
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
  createDateTime:any;
  countryValue:any;
  pvCitizenId:any;
  visaCountryId: any;
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
      "id":this.id,
      "pvCitizenId": this.pvCitizenId,
      "visaCountryId":this.visaCountryId
    }
  }

  ngOnInit(){
    this.submit();
  }
  submit(){
    // this.getPayload();
    //provide your endpoint here
    let endpoint="http://localhost:8080/pv/api/findAllPvCitizenPassportForVisa";

   this.commonService.getData(endpoint).subscribe(res=>{
     var jsonResult = JSON.parse(JSON.stringify(res));
     this.rows = jsonResult;

     console.log(this.rows);
    });;
  }

  requestForVisa(id: any, visaCountryId: any) {

    console.log("Recieved call at requestForVisa() method : " + id + " | " + visaCountryId);

    // let params = new HttpParams();
    // params = params.append('id', id);

    this.payload = {
      id: id,
      visaCountryId:visaCountryId
    };

    let endpoint="http://localhost:8080/pv/api/requestForVisa";
    
    this.commonService.postData(endpoint, this.payload).subscribe(res=>{
      console.log(res);

      this.bodyText = 'Request for Visa sent successfully.'
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
