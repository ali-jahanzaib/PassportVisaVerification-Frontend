import { Component, OnInit } from '@angular/core';
//  import { AuthService } from '../_services/auth.service';
import { CommonServiceService } from './../common-service.service';
import { StoreServiceService } from '../services/store-service.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(
    private commonService: CommonServiceService,
    private router: Router,
    private storeService:StoreServiceService
  ) {}
  payload: any;

  ngOnInit(): void {}

  onchange(): void {}
  onSubmit(): void {
    const { username, password } = this.form;

    this.payload = {
      username: this.form.username,
      password: this.form.password,
    };

    let endpoint = 'http://localhost:8080/profile/auth/login';

    console.log(endpoint);
    console.log(this.payload);

    const httpOptions = {
      headers: new HttpHeaders({}),
    };

    this.commonService.postData(endpoint, this.payload, false).subscribe(
      (data) => {
        console.log(data);
        localStorage.setItem('auth', JSON.stringify(data));
        var jsonResult = JSON.parse(JSON.stringify(data));
        
        this.storeService.setShowMenu(true)
        this.router.navigateByUrl('/home');
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
