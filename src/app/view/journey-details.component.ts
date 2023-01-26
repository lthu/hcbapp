import { Component, Input, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { Journey } from '../model/journey';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-journey-details',
  styleUrls: ['./journey-details.component.css'],
  template: `<p class="journeyDetails">Journey details {{data.id}} {{data.departure_station}} -> {{data.return_station}}</p>`
})
  

export class JourneyDetailsComponent implements OnChanges {
  @Input('journeyInformation') journeyDetails!: Journey;
  journeyDetailsInformation = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  
    

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['journeyDetails'].currentValue.id)
    this.journeyDetailsInformation = this.journeyDetails.departure_station_name;
  }
  
    

    
  
}
