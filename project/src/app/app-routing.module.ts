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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
