import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-station-details',
  template: `<p>{{stationIdNumber}}</p>`,
  styleUrls: ['./station-details.component.css']
})
export class StationDetailsComponent {
  @Input() stationIdNumber!: number;
}
