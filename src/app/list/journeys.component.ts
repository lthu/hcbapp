import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Journey } from '../model/journey';

@Component({
  selector: 'app-journeys',
  templateUrl: './journeys.component.html',
  styleUrls: ['./journeys.component.css']
})
export class JourneysComponent implements OnInit {

  constructor(private ds: DataService) {}
  journeyList: Journey[] = [];
  
  ngOnInit(): void {
      this.getJourneys();
      
  }

  private getJourneys() {
    this.ds.getJourneys().subscribe((journey) => {
      this.journeyList = journey;
    })
  }
}



