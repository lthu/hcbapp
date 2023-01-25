import { Component, Input } from '@angular/core';
import { Journey } from '../model/journey';

@Component({
  selector: 'app-journey-details',
  templateUrl: './journey-details.component.html',
  styleUrls: ['./journey-details.component.css']
})

export class JourneyDetailsComponent {
  @Input('journeyDetails') journeyDetails!: Journey;
  
}
