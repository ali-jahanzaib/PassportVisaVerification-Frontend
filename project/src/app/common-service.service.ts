import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  constructor(private http: HttpClient) {}

  // sending token as Authorization header for all backend calls after login
  getHeaders() {
    const userJson = localStorage.getItem('auth');
    const auth = userJson !== null ? JSON.parse(userJson) : null;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      }),
    };
    return httpOptions;
  }

  getData(endpoint: any) {
    return this.http.get(endpoint, this.getHeaders());
  }
  postData(endpoint: any, payload: any, isLoggedIn: boolean = true) {
    return this.http.post(
      endpoint,
      payload,
      isLoggedIn ? this.getHeaders() : {}
    );
  }
  postDataWithQueryParam(endpoint: any, requestParams: any) {
    return this.http.post(
      endpoint,
      { params: requestParams },
      this.getHeaders()
    );
  }
}
