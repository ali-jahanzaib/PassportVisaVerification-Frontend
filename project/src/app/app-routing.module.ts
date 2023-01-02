import { HomeComponent } from './home/home.component';
import { Form2Component } from './form2/form2.component';
import { NavComponent } from './nav/nav.component';
import { Form1Component } from './form1/form1.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Form3Component } from './form3/form3.component';
import { Form4Component } from './form4/form4.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PassportApprovalComponent } from './PassportApproval/PassportApproval.component';
import { CitizenCreationComponent } from './CitizenCreation/CitizenCreation.component';
import { VisaApprovalComponent } from './VisaApproval/VisaApproval.component';
import { ImmigrationRequestComponent } from './ImmigrationRequest/ImmigrationRequest.component';
import { CitizenProfileComponent } from './CitizenProfile/CitizenProfile.component';
import { CitizenPassportRequestComponent } from './CitizenPassportRequest/CitizenPassportRequest.component';
import { PassportOfficerProfileComponent } from './PassportOfficerProfile/PassportOfficerProfile.component';
import { PassportOfficerCreationComponent } from './PassportOfficerCreation/PassportOfficerCreation.component';

const routes: Routes = [
  {
    path:'',component:LoginComponent
  },
  {
    path:'form1', component:Form1Component,
  },
  {
    path:'form2',component:Form2Component
  },
  {
    path:'home',component:HomeComponent
  },
  {
    path:'form3',component:Form3Component
  },
  {
    path:'form4',component:Form4Component
  },
  {
    path:'register',component:RegisterComponent
  },
  { 
    path:'PassportApproval', component:PassportApprovalComponent
  },
  { 
    path:'CitizenCreation', component:CitizenCreationComponent
  },
  { 
    path:'VisaApproval', component:VisaApprovalComponent
  },
  { 
    path:'ImmigrationRequest', component:ImmigrationRequestComponent
  },
  {
    path:'CitizenProfile', component:CitizenProfileComponent
  },
  {
    path:'CitizenPassportRequest', component:CitizenPassportRequestComponent
  },
  {
    path:'PassportOfficerProfile' ,component:PassportOfficerProfileComponent
  },
  {
    path:'PassportOfficerCreation' ,component:PassportOfficerCreationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
