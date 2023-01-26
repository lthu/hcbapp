import { Component, Input, OnChanges, SimpleChanges, Inject, OnInit } from '@angular/core';
import { JourneyDetails } from '../model/journey';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from '../data.service';
import { Map } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-journey-details',
  styleUrls: ['./journey-details.component.css'],
  template: `<div class="fs-container"> <p class="journeyDetails">Journey details {{journeyDetails.id}} {{journeyDetails.departure_station_name}} -> {{journeyDetails.return_station_name}}</p>
  <p>{{journeyDetails.departure_station_coordinate_x}} , {{journeyDetails.departure_station_coordinate_y}} </p>

  <p>{{journeyDetails.return_station_coordinate_x}} , {{journeyDetails.return_station_coordinate_y}} </p>
  
    <app-map 
    (map$)="receiveMap($event)"
    (zoom$)="receiveZoom($event)"
    [x_coordinate]="journeyDetails.departure_station_coordinate_x"
    [y_coordinate]="journeyDetails.departure_station_coordinate_y"
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
