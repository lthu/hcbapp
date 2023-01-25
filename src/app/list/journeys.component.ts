import { MatPaginator  } from '@angular/material/paginator'
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Journey } from '../model/journey';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


const TESTDATA: Journey[] = [
  {id: 1, departure_time: "1293", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 2, departure_time: "1923", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 3, departure_time: "1923", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 4, departure_time: "1283", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 5, departure_time: "1237", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 6, departure_time: "1236", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 7, departure_time: "12453", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 8, departure_time: "1233", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 9, departure_time: "12323", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 10, departure_time: "12233", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 11, departure_time: "1233", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 11, departure_time: "1233", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 11, departure_time: "1233", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 11, departure_time: "1233", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 11, departure_time: "1233", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 11, departure_time: "1233", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 11, departure_time: "1233", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 11, departure_time: "1233", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 11, departure_time: "1233", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 11, departure_time: "1233", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 11, departure_time: "1233", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 11, departure_time: "1233", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 11, departure_time: "1233", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 11, departure_time: "1233", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  },
  {id: 12, departure_time: "1323", return_time: "321", departure_station_name: "A", return_station_name: "B", distance: 10, duration: 0  }
];
  

@Component({
  selector: 'app-journeys',
  templateUrl: './journeys.component.html',
  styleUrls: ['./journeys.component.css']
})
export class JourneysComponent implements OnInit {
  displayedColumns: string[] = ['departure_time', 'return_time', 'departure_station_name', 'return_station_name'];
  constructor(private ds: DataService) {}
  journeyList: Journey[] = [];
  dataSource = new MatTableDataSource(TESTDATA);
  journeyDetails: Journey = {id: 0, departure_time: "", return_time: "", departure_station_name: "", return_station_name: "", distance: 0, duration: 0 };
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    
    this.getJourneys();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
      
  }
  // Pass journey details to child component: journey-details
  showJourneyDetails(i: Journey) {
    this.journeyDetails = i;
  }

  private getJourneys() {
    this.ds.getJourneys().subscribe((journey) => {
      this.journeyList = journey;
      //this.dataSource = new MatTableDataSource(journey);
    })
  }
}



