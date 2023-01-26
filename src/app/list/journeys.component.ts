import { MatPaginator  } from '@angular/material/paginator'
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Journey } from '../model/journey';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JourneyDetailsComponent } from '../view/journey-details.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-journeys',
  templateUrl: './journeys.component.html',
  styleUrls: ['./journeys.component.css']
})
export class JourneysComponent implements OnInit {
  displayedColumns: string[] = ['id', 'departure_time', 'return_time', 'departure_station_name', 'return_station_name'];
  dataSource = new MatTableDataSource<Journey>();
  journeyDetails: Journey = {id: 0, departure_time: "", return_time: "", departure_station_name: "", return_station_name: "", distance: 0, duration: 0 };

  
  constructor(private ds: DataService, public dialog: MatDialog) {}
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.getJourneys();
  
  }

  // Pass journey details to child component: journey-details
  showJourneyDetails(i: any) {
    // this.journeyDetails = i;
    this.dialog.open(JourneyDetailsComponent, {
      data: {
        id: i.id,
        return_station: i.return_station_name,
        departure_station: i.departure_station_name,
      }
    });
  }

  // Get journey data from data service with api and set journey data as datasource for the table.
  private getJourneys() {
    this.ds.getJourneys().subscribe((journey) => {

      this.dataSource = new MatTableDataSource<Journey>(journey);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
}



