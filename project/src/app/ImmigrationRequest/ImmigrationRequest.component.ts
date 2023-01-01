import { CommonServiceService } from './../common-service.service';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { HttpHeaders } from '@angular/common/http';
import { ModalService } from '../_modal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-immigrationrequest',
  templateUrl: './ImmigrationRequest.component.html',
  styleUrls: ['./ImmigrationRequest.component.css']
})
export class ImmigrationRequestComponent {

  cnicPassport:string="";
  columns=['Citizen Name','Passport Type','Passport Status','Visa Country','Visa Status','Visa Type','Visa Expiry Date','Action']

  rows=[
    {
      citizenName : "",
      statusValue : "",
      passportTypeValue : "",
      issuanceExpiry:"",
      id:"",
      foreignVisaAgencyName:"",
      visaCountryValue:"",
      visaTypeValue:"",
      passportStatus:"",
      passportType:""
    }
  ]
  foreignVisaAgencyName:any;
  citizenName:any;
  statusValue:any;
  passportTypeValue:any;
  issuanceDate:any;
  issuanceExpiry:any;
  payload:any;
  id:any;
  visaCountryValue:any;
  visaTypeValue:any;
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
      "cnicPassport":this.cnicPassport,
    }
  }
  submit(){
    
    console.log(this.cnicPassport);
    //provide your endpoint here
   
    let endpoint=`${environment.API_ENDPOINT}/${environment.PORTAL}/api/findAllCitizenVisaByIdentityNo?identityNo=` + this.cnicPassport+"&passportNo=";

   this.commonService.getData(endpoint).subscribe(res=>{
      console.log(res);

      var jsonResult = JSON.parse(JSON.stringify(res));
      console.log(jsonResult);
      this.rows = jsonResult;
       
    },
    (err) => {
      this.bodyText = err.error.message;
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
