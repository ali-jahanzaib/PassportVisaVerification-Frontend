import { CommonServiceService } from './../common-service.service';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient,HttpParams } from '@angular/common/http';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { HttpHeaders } from '@angular/common/http';
import { ModalService } from '../_modal';
import { environment } from 'src/environments/environment';
import Web3 from "web3";

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
      "userAddress": "",
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
    let endpoint=`${environment.API_ENDPOINT}/${environment.PORTAL}/api/findAllPvCitizenPassport/`;

   this.commonService.getData(endpoint).subscribe(res=>{
     var jsonResult = JSON.parse(JSON.stringify(res));
     this.rows = jsonResult;

     console.log(this.rows);
    });;
  }

  async updatePassportData(address, id: any, status: any) {

    console.log("Recieved call at updatePassportData() method : " + id);
    console.log("Status: " + status);
    try {
      await this.contract.methods
        .signPassport(
          address,
          status == 'Approved' ? 1 : 2
        )
        .send({ from: this.connectedAccount });

      let params = new HttpParams();
      params = params.append('citizenPassportId', id);
      params = params.append('status', status);

      console.log("Http Params: " + params);
      let endpoint=`${environment.API_ENDPOINT}/${environment.PORTAL}/api/updatePassportData?`+params;

      this.commonService.postDataWithQueryParam(endpoint, params).subscribe(res=>{
        console.log(res);

        this.bodyText = 'Passport status updated.'
        this.openModal('custom-modal-1');
      });;
    } catch (err) {
      console.log(err);
    }
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
      window.location.reload();
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

  constructor(private breakpointObserver: BreakpointObserver,
    public commonService:CommonServiceService,
    private modalService: ModalService) {
    this.loadAbi();
  }
}
