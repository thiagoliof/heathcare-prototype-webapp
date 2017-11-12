import { Component, OnInit } from '@angular/core';

import { Patient } from '../patient';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patientes',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  
  patients: Patient[];

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatients()
    .subscribe(patients => this.patients = patients);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.patientService.addPatient({ name } as Patient)
      .subscribe(patient => {
        this.patients.push(patient);
      });
  }

  delete(patient: Patient): void {
    this.patients = this.patients.filter(h => h !== patient);
    this.patientService.deletePatient(patient).subscribe();
  }

}
