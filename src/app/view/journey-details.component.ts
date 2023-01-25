import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Journey } from '../model/journey';

@Component({
  selector: 'app-journey-details',
  styleUrls: ['./journey-details.component.css'],
  template: `<p>Journey details {{journeyDetailsInformation}}</p>`
})
  

export class JourneyDetailsComponent implements OnChanges {
  @Input('journeyInformation') journeyDetails!: Journey;
  journeyDetailsInformation = '';

  
    ngOnChanges(changes: SimpleChanges) {
      console.log(changes['journeyDetails'].currentValue.id)
      this.journeyDetailsInformation = this.journeyDetails.departure_station_name;
    }
  
    

    
  
}
