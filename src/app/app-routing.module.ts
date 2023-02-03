import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JourneysComponent } from './list/journeys.component';
import { StationsComponent } from './list/stations.component';

const routes: Routes = [
  { path: 'journeys', component: JourneysComponent },
  { path: 'stations', component: StationsComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)]
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
