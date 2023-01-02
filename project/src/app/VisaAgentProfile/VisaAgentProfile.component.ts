import { CommonServiceService } from './../common-service.service';
import {Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { HttpHeaders } from '@angular/common/http';
import { ModalService } from '../_modal';
import Web3 from "web3";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-visaagentprofile',
  templateUrl: './VisaAgentProfile.component.html',
  styleUrls: ['./VisaAgentProfile.component.css']
})
export class VisaAgentProfileComponent implements OnInit{


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
  userDetails=null;
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

  async submit(){
    //provide your endpoint here


    console.log("Calling contract method to create citizen: ");
    await this.contract.methods
      .createCitizen(
        (this.userDetails.firstName +
        this.userDetails.middleName ? " " :  "" + this.userDetails.middleName +
        this.userDetails.lastName ? " " :  "" + this.userDetails.lastName),
        this.userDetails.identityNo,
        115,
        203
      ).send({ from: this.connectedAccount });

   // updating generated user address in database
   let endpoint=`${environment.API_ENDPOINT}/profile/updateUserAddress`;
   this.payload = {
     id: this.userDetails.id,
     userAddress: this.connectedAccount
   }

   this.commonService.postData(endpoint, this.payload, true).subscribe(res=>{
     console.log(res);

     this.bodyText = 'Citizen connected to Blockchain successfully.'
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
    const user_json = localStorage.getItem('auth') || '';
    this.userDetails = JSON.parse(user_json).user;
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
