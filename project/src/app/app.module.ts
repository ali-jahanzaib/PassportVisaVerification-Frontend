import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Form1Component } from './form1/form1.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { Form2Component } from './form2/form2.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Form3Component } from './form3/form3.component';
import { Form4Component } from './form4/form4.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PassportApprovalComponent } from './PassportApproval/PassportApproval.component';
import { HttpHeaders } from '@angular/common/http';
import { CitizenCreationComponent } from './CitizenCreation/CitizenCreation.component';
import { VisaApprovalComponent } from './VisaApproval/VisaApproval.component';
import { ModalModule } from './_modal';
import { ImmigrationRequestComponent } from './ImmigrationRequest/ImmigrationRequest.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    Form1Component,
    Form2Component,
    HomeComponent,
    Form3Component,
    Form4Component,
    RegisterComponent,
    LoginComponent,
    PassportApprovalComponent,
    CitizenCreationComponent,
    VisaApprovalComponent,
    ImmigrationRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('ali:passw0rd')
  })
};