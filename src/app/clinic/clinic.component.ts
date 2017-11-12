import { Component, OnInit } from '@angular/core';

import { Clinic } from '../clinic';
import { ClinicService } from '../clinic.service';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {
  clinics: Clinic[];

  constructor(private clinicService: ClinicService) { }

  ngOnInit() {
    this.getClinics();
  }

  getClinics(): void {
    this.clinicService.getClinics()
    .subscribe(clinics => this.clinics = clinics);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.clinicService.addClinic({ name } as Clinic)
      .subscribe(clinic => {
        this.clinics.push(clinic);
      });
  }

  delete(clinic: Clinic): void {
    this.clinics = this.clinics.filter(h => h !== clinic);
    this.clinicService.deleteClinic(clinic).subscribe();
  }

}
