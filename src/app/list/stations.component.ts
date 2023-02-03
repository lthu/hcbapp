import { Station, StationDetails, StationDetailsTop5 } from '../model/station';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { Map } from 'leaflet';
import { StationMapComponent } from '../maps/station-map.component';



@Component({
  selector: 'app-stations',
  styleUrls: ['./stations.component.css'],
  template: `
      
<h2 *ngIf="stationDetailsFetched"  style="margin-left: 400px">{{stationDetails[0].name}}</h2>

<div class="flex-container" >
  <div class="flex-item" >
    <h3>Search</h3>
    <input  [formControl]="searchControl">
      <div *ngIf="searchSuccess" class="search">
        <p class="searchItem" *ngFor="let item of searchResult" (click)="searchResultClicked(item.station_id)">{{item.name}}</p>
      </div>
  </div>
  <div *ngIf="!stationDetailsFetched" class="flex-item" >
  <p>Use search or click the map.</p>
  </div>
    <div *ngIf="stationDetailsFetched" class="flex-item">
        <h3>General Information</h3>
        <p>Address: {{stationDetails[0].address}} {{stationDetails[0].city}}</p>
        <p>Total departed journeys: {{stationDetails[0].departed_journeys_total}}</p>
        <p>Total returned journeys: {{stationDetails[0].returned_journeys_total}}</p>
        <p>Average distance (m) (return/departure): ({{stationDetails[0].avg_return_distance | number: '1.0-0'}} /{{stationDetails[0].avg_departure_distance | number: '1.0-0'}})</p>
        <p>Average duration (minutes): {{stationDetails[0].avg_duration | number: '1.0-0'}}</p>
        <p>Capacity: {{stationDetails[0].capacity}}</p>
    </div>
    <div *ngIf="stationDetailsFetched" class="flex-item">
        <h3 >Top 5 Return stations (count)</h3>
        <p class="top5Stations" *ngFor="let item of stationTop5ReturnInformation" (click)="hilightOne(item.station_id)" > {{item.name}} ({{item.count}}) </p>
        <p class="top5Stations hilightbutton"  (click)="hilightStationData(stationTop5ReturnInformation)">Highlight all on the map</p>
    </div>    
    <div *ngIf="stationDetailsFetched" class="flex-item">
        <h3>Top 5 Departure stations (count)</h3>
        <p class="top5Stations" *ngFor="let item of stationTop5DepartureInformation" (click)="hilightOne(item.station_id)"> {{item.name}} ({{item.count}}) </p>
        <!-- Hilight call either with return or departure information, see similar call above with different argument -->
        <p class="top5Stations hilightbutton"  (click)="hilightStationData(stationTop5DepartureInformation)">Highlight all on the map</p>
      </div>
  
  <div class="flex-item">
    <app-station-map 
    (stationId)="getStationData($event)"
    (map$)="receiveMap($event)"
    (zoom$)="receiveZoom($event)"
    [stations]="stations"
    [searchResultId]="selectedStationId"
    id='main-map'></app-station-map>
    </div>
  </div>
`
})
export class StationsComponent implements OnInit {

  constructor(private ds: DataService) {}
  // Stores station data for every station
  stations!: Station[];
  // Stores individual details about on specific station
  stationDetails!: StationDetails[];
  // Top 5 return stations for one individual station
  // We could get rid of these two variables by improving the back end behaviour
  stationTop5DepartureInformation!: StationDetailsTop5[]
  stationTop5ReturnInformation!: StationDetailsTop5[]
  @ViewChild(StationMapComponent)
  private stationMap!: StationMapComponent
  private map!: Map;
  private zoom!: number;
  // Way to check if specific station details were fetched
  stationDetailsFetched: boolean = false
  searchSuccess: boolean = false
  searchControl = new FormControl()
  searchResult!: any[];
  selectedStationId!: number
  

  ngOnInit(): void {
      // Call function to retrive all stations
    this.getStations();
    this.searchControl.valueChanges.subscribe(value => {
      if(value.length > 0) {
        // Only filter the array if there actually is any text in the searchbar
        this.searchResult = this.stations.filter(station => station.name.includes(value))
        this.searchSuccess = true
      } else           
        this.searchSuccess = false
    });
  }
  
  // Function to retrieve stations from backend with DataService component
  private getStations() {
    this.ds.getStations().subscribe((stations => this.stations = stations))
  }
  // Function to highlight top 5 stations on the map when user clicks the link on the HTML
  // This function calls the child components hilight function 
  hilightStationData(stations: any[]) {
    this.stationMap.hilightTop5Stations(stations)
  }
  // Function to retrieve individual station information. Function is called when child component emit's a station id from the map
  // stationDetails is used to show the information in the current view.
  getStationData(id: number) {
    this.ds.getStationById(id).subscribe((station) => {
      this.stationDetails = station
      this.stationDetailsFetched = true
    })
    // Fetch top 5 information
    this.ds.getTop5ReturnStations(id).subscribe((station) => this.stationTop5ReturnInformation = station)
    this.ds.getTop5DepartureStations(id).subscribe((station) => this.stationTop5DepartureInformation = station)
  }
  // Function to pass station id to child component when user uses the searchbar and clicks a result.
  searchResultClicked(id: number) {
     this.selectedStationId = id
  }
  // Function to hightlight a specific station on the map when user clicks either on of the top 5 stations in stationdetails view.
  // Information is passed to the child component that handles marker change.
  hilightOne(id: number) {
    this.stationMap.higlightSingleStation(id)
  }
  receiveMap(map: Map) {
    this.map = map  
  }
  receiveZoom(zoom: number) {
    this.zoom = zoom
  }
}
