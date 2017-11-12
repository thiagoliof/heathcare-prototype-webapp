import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClinicComponent }      from './clinic/clinic.component';
import { ClinicDetailComponent }      from './clinic-detail/clinic-detail.component';

import { PatientComponent }      from './patient/patient.component';
import { PatientDetailComponent }      from './patient-detail/patient-detail.component'

import { TherapistComponent }      from './therapist/therapist.component';
import { TherapystDetailComponent }      from './terapyst-detail/terapyst-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/clinic', pathMatch: 'full' },
 
  { path: 'clinic', component: ClinicComponent },
  { path: 'clinic-detail/:id', component: ClinicDetailComponent },
  
  { path: 'patient', component: PatientComponent },
  { path: 'patient-detail/:id', component: PatientDetailComponent },

  { path: 'therapyst', component: TherapistComponent },
  { path: 'therapyst-detail/:id', component: TherapystDetailComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
