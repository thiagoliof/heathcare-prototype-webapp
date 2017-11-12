import { Component, OnInit } from '@angular/core';

import { Therapyst } from '../therapyst';
import { TherapystService } from '../therapyst.service';

@Component({
  selector: 'app-therapists',
  templateUrl: './therapist.component.html',
  styleUrls: ['./therapist.component.css']
})
export class TherapistComponent implements OnInit {
  
  therapysts: Therapyst[];

  constructor(private therapystService: TherapystService) { }

  ngOnInit() {
    this.getTherapyst();
  }

  getTherapyst(): void {
    this.therapystService.getTerapists()
    .subscribe(therapysts => this.therapysts = therapysts);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.therapystService.addTerapists({ name } as Therapyst)
      .subscribe(therapyst => {
        this.therapysts.push(therapyst);
      });
  }

  delete(therapyst: Therapyst): void {
    this.therapysts = this.therapysts.filter(h => h !== therapyst);
    this.therapystService.deleteTerapyst(therapyst).subscribe();
  }

}
