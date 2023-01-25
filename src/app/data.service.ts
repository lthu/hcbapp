import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Journey } from './model/journey';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  private journeyApiURL = 'http://localhost:3000/api/journeys'
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  /*getJourneys() {
    return this.http.get<Journey[]>(this.journeyApiURL)
    .pipe(map((res) => {
      const journeys = [];
      for (const key in res) {
        if (res.hasOwnProperty(key)) {
          journeys.push({...res[key], id: key})
        }
      }
      return journeys;
    }))
  }*/
  getJourneys(): Observable<Journey[]> {
    return this.http.get<Journey[]>(this.journeyApiURL)
  }
 
}
