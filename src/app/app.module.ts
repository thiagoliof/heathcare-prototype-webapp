import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';

import { ClinicComponent }      from './clinic/clinic.component';
import { ClinicDetailComponent }      from './clinic-detail/clinic-detail.component';
import { PatientComponent }      from './patient/patient.component';
import { PatientDetailComponent }      from './patient-detail/patient-detail.component'
import { TherapistComponent }      from './therapist/therapist.component';
import { TherapystDetailComponent }      from './terapyst-detail/terapyst-detail.component';

import { ClinicService }          from './clinic.service';
import { PatientService }          from './patient.service';
import { TherapystService }          from './therapyst.service';
import { MessageService }       from './message.service';
import { MessagesComponent }    from './messages/messages.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercep  ts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    ClinicComponent,
    MessagesComponent,
    PatientComponent,
    TherapistComponent,
    TherapystDetailComponent,
    ClinicDetailComponent,
    PatientDetailComponent,
  ],
  providers: [ ClinicService, PatientService, TherapystService, MessageService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
