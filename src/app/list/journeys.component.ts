import { Component } from '@angular/core';

@Component({
  selector: 'app-journeys',
  templateUrl: './journeys.component.html',
  styleUrls: ['./journeys.component.css']
})
export class JourneysComponent {
  journeyDetails = {id: 1, departure_time: "2021-05-01T12:45:0000Z", return_time: "2021-05-01T12:45:0000Z", departure_station_id: 501, return_station_id: 101, distance: 1050, duration: 600 }
}


//CREATE TABLE journeys (id SERIAL PRIMARY KEY, departure_time TIMESTAMP, return_time TIMESTAMP, departure_station_id INT, return_station_id INT,distance INT DEFAULT 0, duration int DEFAULT 0 NOT NULL);
