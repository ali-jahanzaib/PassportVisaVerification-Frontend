import { CommonServiceService } from './../common-service.service';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { HttpHeaders } from '@angular/common/http';

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
      "identityNumber":this.cnicPassport,
      "firstName":this.firstName,
      "middleName":this.middleName,
      "lastName":this.lastName,
      "fullName":this.fullName,
      "fatherName":this.fatherName,
      "userName": this.userName
    }
    console.log("Payload after setting: ", this.payload);
    let endpoint="http://localhost:8080/pv/api/savePvCitizen";

   this.commonService.postData(endpoint, this.payload, true).subscribe(res=>{
     console.log(res);
     
    });;
    
  }
  constructor(private breakpointObserver: BreakpointObserver,
    public commonService:CommonServiceService) {}
}
