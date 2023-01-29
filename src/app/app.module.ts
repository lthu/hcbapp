import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { JourneysComponent } from './list/journeys.component';
import { StationsComponent } from './list/stations.component';
import { StationDetailsComponent } from './view/station-details.component';
import { JourneyDetailsComponent } from './view/journey-details.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'; 
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MapComponent } from './maps/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { StationMapComponent } from './maps/station-map.component';

@NgModule({
  declarations: [
    AppComponent,
    JourneysComponent,
    StationsComponent,
    StationDetailsComponent,
    JourneyDetailsComponent,
    MapComponent,
    StationMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    LeafletModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
