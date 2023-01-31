import { Station, StationDetails, StationDetailsTop5 } from '../model/station';
import { Component, Input, OnChanges, SimpleChanges, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { Map } from 'leaflet';
import { StationMapComponent } from '../maps/station-map.component';



@Component({
  selector: 'app-stations',
  styleUrls: ['./stations.component.css'],
  template: `
      
<h2 *ngIf="stationDetailsFetched" style="margin-left: 400px">{{stationDetails[0].name}}</h2>
<div class="bounds">
  
  <div fxLayout="row" fxLayoutAlign="start stretch">
  <div fxFlex="20" fxFlex.xs="55" id="search">
    <p>Search</p>
    <input  [formControl]="searchControl">
      <div class="search" *ngIf="searchSuccess">
        <p  *ngFor="let item of searchResult" (click)="searchResultClicked(item.station_id)"> {{item.name}} id: ({{item.station_id}}) </p>
        
      </div>
  </div>
    <div *ngIf="stationDetailsFetched">
      <div fxFlex="100" fxFlex.xs="55">
        <h5>General Information</h5>
        <p>Address: {{stationDetails[0].address}} {{stationDetails[0].city}}</p>
        <p>Total departed journeys: {{stationDetails[0].departed_journeys_total}}</p>
        <p>Total returned journeys: {{stationDetails[0].returned_journeys_total}}</p>
        <p>Capacity: {{stationDetails[0].capacity}}</p>
      </div>
      <div fxFlex="100" fxFlex.xs="55">
        <h5 (click)="higlightStationData()">Top 5 Return stations</h5>
        <p *ngFor="let item of stationTop5ReturnInformation" (mouseenter)="mouseOn(item.station_id)" (mouseleave)="mouseOff(item.station_id)"> {{item.name}} ({{item.station_id}}) </p>
      </div>    
      <div fxFlex="100" >
        <h5>Top 5 Departure stations</h5>
        <p *ngFor="let item of stationTop5DepartureInformation"> {{item.name}} ({{item.station_id}}) </p>
      </div>
    </div>
  
</div>
    <app-station-map 
    (stationId)="getStationData($event)"
    (map$)="receiveMap($event)"
    (zoom$)="receiveZoom($event)"
    [coordinates]="stations"
    [searchResultId]="selectedStationId"
    [top5Stations]="top5Stations"
    id='main-map'></app-station-map>
  
</div>

`
})
export class StationsComponent implements OnInit, AfterViewInit{

  constructor(private ds: DataService) {}
  stations!: Station[];
  stationDetails!: StationDetails[]
  stationTop5DepartureInformation!: StationDetailsTop5[]
  stationTop5ReturnInformation!: StationDetailsTop5[]
  @ViewChild(StationMapComponent) 
  private stationMap!: StationMapComponent
  private map!: Map;
  private zoom!: number;
  stationDetailsFetched: boolean = false
  searchSuccess: boolean = false
  searchControl = new FormControl();
  stationSearch! : string;
  searchResult!: any[];
  selectedStationId!: number
  top5Stations: number[] = [];
  
  

  ngOnInit(): void {
      this.getStations();
      this.searchControl.valueChanges.subscribe(value => {
        if(value.length > 0) {
          this.searchResult = this.stations.filter(station => station.name.includes(value))
          this.searchSuccess = true
        } else           
          this.searchSuccess = false
      });
  }
  ngAfterViewInit(): void { }
  private getStations() {
    this.ds.getStations().subscribe((stations =>{
      this.stations = stations;
     }))
  }

  higlightStationData() {
    console.log("StationsComponent: higlightStationData()")
    this.stationMap.hilightTop5Stations();
  }
  getStationData(id: number) {
    this.ds.getStationById(id).subscribe((station) => {
      this.stationDetails = station;
      this.stationDetailsFetched = true;
    })

    this.ds.getTop5ReturnStations(id).subscribe((station) => {
      this.stationTop5ReturnInformation = station;
      this.top5Stations.length = 0;
      station.forEach(element => {
        this.top5Stations.push(element.station_id)
      });
    
    })

    this.ds.getTop5DepartureStations(id).subscribe((station) => {
      this.stationTop5DepartureInformation = station;
    })
  }
  searchResultClicked(id: number) {
    this.selectedStationId = id;
    console.log("clicked on search result: " + id)

  }
  mouseOn(id: number) {
    
    this.stationMap.hoverOnStation(id);
  }
  mouseOff(id: number) {
    this.stationMap.hoverOffStation(id);
  }
  receiveMap(map: Map) {
    this.map = map;
    
  }

  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }
}
