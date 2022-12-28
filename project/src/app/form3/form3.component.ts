import { CommonServiceService } from './../common-service.service';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient,HttpParams } from '@angular/common/http';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { HttpHeaders } from '@angular/common/http';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-form3',
  templateUrl: './form3.component.html',
  styleUrls: ['./form3.component.css']
})
export class Form3Component {
  columns=['Name','Identity No','Father Name','Gender','Country','Passport Requested', 'Action']

  rows=[
    {
      name : "name",
      identityNo : "12345",
      fatherName : "America",
      genderValue : "gender",
      countryValue : "12345",
      passportIssued : "",
      id:""
    }
  ]
  name:any;
  identityNo:any;
  fatherName:any;
  countryValue:any;
  genderValue:any;
  passportIssued:any;
  payload: any;
  id: any;
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
   
  ngOnInit(){
    this.submit();
  }
  submit(){
    // this.getPayload();
    //provide your endpoint here
    let endpoint="http://localhost:8080/pv/api/findAllPvCitizenForPassport/";

   this.commonService.getData(endpoint).subscribe(res=>{
  
     var jsonResult = JSON.parse(JSON.stringify(res));
     this.rows = jsonResult;

     console.log(this.rows);
    });; 
  }

  requestForPassport(id: any) {

    console.log("Recieved call at requestForPassport() method : " + id);

    this.payload = {
      id: id
    };

    let endpoint="http://localhost:8080/pv/api/requestForPassport";
    
    this.commonService.postData(endpoint, this.payload).subscribe(res=>{
      console.log(res);

      this.bodyText = 'Request sent for passport successfully.'
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