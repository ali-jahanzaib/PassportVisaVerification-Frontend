import { CommonServiceService } from './../common-service.service';
import {Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient,HttpParams } from '@angular/common/http';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { HttpHeaders } from '@angular/common/http';
import { ModalService } from '../_modal';
import Web3 from "web3";

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form3',
  templateUrl: './form3.component.html',
  styleUrls: ['./form3.component.css']
})
export class Form3Component implements OnInit{
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

  // ngOnInit(){
  //   this.submit();
  // }

  async submit(){
    // this.getPayload();
    //provide your endpoint here
    let endpoint=`${environment.API_ENDPOINT}/${environment.PORTAL}/api/findAllPvCitizenForPassport/`;

    // await this.contract.methods
    //   .create(
    //     (this.firstName +
    //     this.middleName ? " " :  "" + this.middleName +
    //     this.lastName ? " " :  "" + this.lastName),
    //     this.cnicPassport,
    //     118,
    //     203
    //   ).send({ from: this.connectedAccount });

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

    let endpoint=`${environment.API_ENDPOINT}/${environment.PORTAL}/api/requestForPassport`;
    
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


  ngOnInit(): void {
    console.log("this.loadAbi();");
    this.loadAbi();
    this.submit();
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
