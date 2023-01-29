import { Component, Input, OnChanges, SimpleChanges, Inject, OnInit } from '@angular/core';
import { JourneyDetails } from '../model/journey';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { Map } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-journey-details',
  styleUrls: ['./journey-details.component.css'],
  template: `<div class="fs-container"> 
    <h2 class="journeyDetails">Journey details</h2>
    <p class="journeyDetails">From {{journeyDetails.departure_station_name}} to {{journeyDetails.return_station_name}}</p>
    <p class="journeyDetails">Starting {{journeyDetails.departure_time | date: 'd.L.y H:mm:ss' }} until {{journeyDetails.return_time | date: 'd.L.y H:mm:ss'}}</p>
    <p class="journeyDetails">Distance {{journeyDetails.distance/1000}} km  Duration {{journeyDetails.duration | number: '1.0-0' }} minutes</p>
    
  

  
    <app-map 
    (map$)="receiveMap($event)"
    (zoom$)="receiveZoom($event)"
    [departureX]="journeyDetails.departure_station_coordinate_x"
    [departureY]="journeyDetails.departure_station_coordinate_y"
    [returnX]="journeyDetails.return_station_coordinate_x"
    [returnY]="journeyDetails.return_station_coordinate_y"
    id='main-map'></app-map>
  </div>

  `
})
  

export class JourneyDetailsComponent implements OnChanges, OnInit {
  journeyDetails: JourneyDetails = {id: 0, departure_time: "", return_time: "", departure_station_name: "", return_station_name: "", distance: 0, duration: 0, departure_station_coordinate_x: 0, departure_station_coordinate_y: 0, return_station_coordinate_x: 0, return_station_coordinate_y: 0 }
  test: number = 1;
  testBoolean: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ds: DataService ) {}
  
  // On initialization fetch single journey details. Data id is received from parent component.
  ngOnInit() {
    this.ds.getJourneyById(this.data.id).subscribe((journey) => {
      this.journeyDetails = journey[0];
      this.test = journey[0].departure_station_coordinate_x;
      this.testBoolean = true;
      
      
    })
  }
  
  formatDuration() {

  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes['journeyDetails'].currentValue.departure_station_coordinate_x)
    
  }
  private map!: Map;
  private zoom!: number;
  
  receiveMap(map: Map) {
    this.map = map;
    
    
  }

  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }
}
