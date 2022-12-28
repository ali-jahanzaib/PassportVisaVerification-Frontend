import { CommonServiceService } from './../common-service.service';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { HttpHeaders } from '@angular/common/http';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-citizencreation',
  templateUrl: './CitizenCreation.component.html',
  styleUrls: ['./CitizenCreation.component.css']
})
export class CitizenCreationComponent {
  cnicPassport:string="";
  firstName:any;
  middleName:any;
  lastName:any;
  fullName:any;
  fatherName:any;
  age:any;
  userName:any;
  payload:any;
  apiResponse:any;
  countryId:any;
  gender:any;
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
  // getPayload(){
  //   this.payload={
  //     "cnicPassport":this.cnicPassport,
  //     "firstName":this.firstName,
  //     "middleName":this.middleName,
  //     "lastName":this.lastName,
  //     "fullName":this.fullName,
  //     "fathersName":this.fathersName,
  //     "age":this.age,
  //     "userName": this.userName
  //   }
  // }
  submit(){
    //provide your endpoint here

    this.payload={
      "identityNo":this.cnicPassport,
      "firstName":this.firstName,
      "middleName":this.middleName,
      "lastName":this.lastName,
      "fullName":this.fullName,
      "fatherName":this.fatherName,
      "userName": this.firstName + "." + this.lastName,
      "userType":1,
      "version":1,
      "countryId": this.countryId,
      "gender":this.gender
    }
    console.log("Payload after setting: ", this.payload);
    let endpoint="http://localhost:8080/pv/api/savePvCitizenData";

   this.commonService.postData(endpoint, this.payload, true).subscribe(res=>{
     console.log(res);
     
     this.bodyText = 'New Citizen added successfully.'
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
