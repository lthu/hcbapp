import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Journey } from './model/journey';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  private journeyApiURL = 'http://localhost:3000/api/journeys'
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  getJourneys(): Observable<Journey[]> {
    return this.http.get<Journey[]>(this.journeyApiURL)
  }
 
}