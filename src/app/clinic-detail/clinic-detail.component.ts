import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Clinic }         from '../clinic';
import { ClinicService }  from '../clinic.service';

@Component({
  selector: 'app-clinic-detail',
  templateUrl: './clinic-detail.component.html',
  styleUrls: [ './clinic-detail.component.css' ]
})
export class ClinicDetailComponent implements OnInit {
  @Input() clinic: Clinic;

  constructor(
    private route: ActivatedRoute,
    private clinicService: ClinicService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getClinic();
  }

  getClinic(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.clinicService.getClinic(id)
      .subscribe(clinic => this.clinic = clinic);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.clinicService.updateClinic(this.clinic)
      .subscribe(() => this.goBack());
  }
}
