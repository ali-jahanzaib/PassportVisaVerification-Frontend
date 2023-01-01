import { CommonServiceService } from './../common-service.service';
import {Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { HttpHeaders } from '@angular/common/http';
import { ModalService } from '../_modal';
import Web3 from "web3";

@Component({
  selector: 'app-citizencreation',
  templateUrl: './CitizenCreation.component.html',
  styleUrls: ['./CitizenCreation.component.css']
})
export class CitizenCreationComponent implements OnInit{


  form: any = {
    cnicPassport: null
  };

  cnicPassport:any;
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
  nationality:any;
  birthPlace:any;
  email:any;
  abiJson = null;
  connectedAccount = null;
  contract = null;
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
  async submit(){
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
      "gender":this.gender,
      "nationality":this.nationality,
      "birthPlace":this.birthPlace,
      "email":this.email
    }
    console.log("Payload after setting: ", this.payload);

    await this.contract.methods
      .createCitizen(
        (this.firstName +
        this.middleName ? " " :  "" + this.middleName +
        this.lastName ? " " :  "" + this.lastName),
        this.cnicPassport,
        118,
        203
      ).send({ from: this.connectedAccount });

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

  ngOnInit(): void {
    console.log("this.loadAbi();");
    this.loadAbi();
  }

  loadAbi() {
    this.abiJson = require('../abis/pv/PvContract.json');
    this.loadWeb3();
    this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window['ethereum']) {
      window['web3'] = new Web3(window['ethereum']);
      await window['ethereum'].enable();
      window['ethereum'].on('accountsChanged', function (accounts) {
        location.reload();
      });
    } else if (window['web3']) {
      window['web3'] = new Web3(window['web3'].currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {

    const web3 = window['web3'];
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.connectedAccount = accounts[0];
    const networkId = await web3.eth.net.getId();

    const networkData = this.abiJson.networks[networkId];
    if (networkData) {
      this.contract = new web3.eth.Contract(

        this.abiJson.abi,
        networkData.address
      );
      // this;
    } else {
      window.alert("contract not deployed to detected network.");
    }
  }
}
