import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Therapyst }         from '../therapyst';
import { TherapystService }  from '../therapyst.service';

@Component({
  selector: 'app-therapyst-detail',
  templateUrl: './terapyst-detail.component.html',
  styleUrls: [ './terapyst-detail.component.css' ]
})
export class TherapystDetailComponent implements OnInit {
  @Input() therapyst: Therapyst;

  constructor(
    private route: ActivatedRoute,
    private therapystService: TherapystService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTherapyst();
  }

  getTherapyst(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.therapystService.getTerapyst(id)
      .subscribe(therapyst => this.therapyst = therapyst);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.therapystService.updateTerapist(this.therapyst)
      .subscribe(() => this.goBack());
  }
}
