import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Journey, JourneyDetails } from './model/journey';
import { Station, StationDetails, StationDetailsTop5 } from './model/station';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  private apiURL = 'http://localhost:3000/api/'
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getJourneys(): Observable<Journey[]> {
    return this.http.get<Journey[]>(this.apiURL + 'journeys/')
  }
  getJourneyById(id: number): Observable<JourneyDetails[]> {
    return this.http.get<JourneyDetails[]>(this.apiURL + 'journeys/' + id)
  }
  getStations(): Observable<Station[]> {
    return this.http.get<Station[]>(this.apiURL + 'stations/')
  }
  getStationById(id: number): Observable<StationDetails[]> {
    return this.http.get<StationDetails[]>(this.apiURL + 'stations/' + id)
  }
  getTop5ReturnStations(id: number): Observable<StationDetailsTop5[]> {
    return this.http.get<StationDetailsTop5[]>(this.apiURL + 'stations/top5ReturnStations/' + id)
  }
  getTop5DepartureStations(id: number): Observable<StationDetailsTop5[]> {
    return this.http.get<StationDetailsTop5[]>(this.apiURL + 'stations/top5DepartureStations/' + id)
  }
 
}
