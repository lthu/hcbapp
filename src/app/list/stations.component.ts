import { Station } from '../model/station';
import { Component, Input, OnChanges, SimpleChanges, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from '../data.service';
import { Map } from 'leaflet';
import { StationMapComponent } from '../maps/station-map.component';



@Component({
  selector: 'app-stations',
  styleUrls: ['./stations.component.css'],
  template: `<h2>Stations</h2>
      <app-station-map 
      (map$)="receiveMap($event)"
      (zoom$)="receiveZoom($event)"
      [coordinates]="stations"
      id='main-map'></app-station-map>`
})
export class StationsComponent implements OnInit, AfterViewInit{

  constructor(private ds: DataService) {}
  stations!: Station[];
  @ViewChild(StationMapComponent) 
  private stationMap!: StationMapComponent;
  private map!: Map;
  private zoom!: number;
  

  ngOnInit(): void {
      this.getStations();
  }
  ngAfterViewInit(): void { }
  private getStations() {
    this.ds.getStations().subscribe((stations =>{
      this.stations = stations;
     }))
  
  }
  receiveMap(map: Map) {
    this.map = map;
    
  }

  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }
}
