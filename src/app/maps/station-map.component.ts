import { NgZone, HostListener ,Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges, AfterViewInit } from '@angular/core';
import { Map, Control, DomUtil, ZoomAnimEvent , Layer, MapOptions, tileLayer, latLng, icon, Marker, LayerGroup} from 'leaflet';
import { DataService } from '../data.service';
import { Station, StationDetails } from '../model/station';



@Component({
  selector: 'app-station-map',
  styleUrls: ['./station-map.component.css'],
  template: `
  
  
  <div class="map-container" leaflet
     [leafletOptions]="options"
     (leafletMapReady)="onMapReady($event)"></div>`
})

export class StationMapComponent implements OnDestroy {
  
  @Output() map$: EventEmitter<Map> = new EventEmitter
  @Output() zoom$: EventEmitter<number> = new EventEmitter

  // Id of station clicked on the map sent to the parent.
  @Output() stationId = new EventEmitter<number>()
  
  // Array of station data  received from parent component (StationsComponent)
  @Input() stations!: Station[]
  @Input() top5Stations!: number[]
  @Input() searchResultId: number = 0;
  @Input() options: MapOptions = {
                      layers:[tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        opacity: 1,
                        maxZoom: 19,
                        detectRetina: true,
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      })],
                      zoom:10,
                      zoomSnap: 0.1,
                      center:latLng(60.179750209022,24.9554449266327),
  };
  zone!: NgZone
  public markers: any[] = new Array()
  stationData!: StationDetails[]
  map!: Map
  zoom!: number
  mapReady: boolean = false
  markersAdded: boolean = false
  iconDefault!: any;

  
  constructor(private ds: DataService, zone: NgZone) { 
    this.zone = zone;
    const iconRetinaUrl = 'assets/marker-icon-2x.png'
    const iconUrl = 'assets/marker-icon.png'
    const shadowUrl = 'assets/marker-shadow.png'
    this.iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
      });

    Marker.prototype.options.icon = this.iconDefault
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.mapReady && !this.markersAdded) {
      var i = 0;

      // Adding marker for each station. Data received from parent component (StationsComponent)
      // When users clicks a speficic station the stationId is emitted for parent to receive.
      this.stations.forEach(element => {
        this.markers[i] = new Marker([element.coordinate_y, element.coordinate_x])
        .bindPopup("<h2> "+ element.name +" </h2>")
        .on("click", () =>{ 
          this.zone.run(() => {
            this.resetMarkers()
            this.stationId.emit(element.station_id)
          })
        })
        .addTo(this.map)
        // Kind of a hack to figure out which marker is for which station
        this.markers[i]._icon.id = element.station_id
        i++;
      })
      this.markersAdded = true;
    }
    // If parent component (StationsComponent) sends a station with via searchbar we close all the popups and search for the right one from markers array.
    // Todo: Build a better validation
    if (this.searchResultId > 0) {
      this.map.closePopup()
      var index = this.stations.findIndex(x => x.station_id === changes['searchResultId'].currentValue);
      this.map.setView(latLng(this.stations[index].coordinate_y, this.stations[index].coordinate_x), 16);
      this.markers[index].openPopup()
      
      // We use the same emit as if user clicked a station on the map. 
      this.stationId.emit(this.searchResultId)
    }
  }
  
  // Set default icon for all the markers
  resetMarkers() {
    this.markers.forEach(element => element.setIcon(this.iconDefault) );
  }

  // Highlights a single station: one clicked from top 5 stations. Click received from parent component (StationsComponent)
  higlightSingleStation(id: number) {
    this.resetMarkers();
    var index = this.stations.findIndex(x => x.station_id == id)
    this.changeMarker(index);
  }

  changeMarker(markerIndex: number) {
    const iconRetinaUrl = 'assets/marker-icon_hilighted.png'
    const iconUrl = 'assets/marker-icon_hilighted.png'
    const shadowUrl = 'assets/marker-shadow.png'
    const newIcon = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [30, 49], // 25, 41 make the icon slightly larger for better visual effect
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
      });
    this.markers[markerIndex].setIcon(newIcon)

  }
  // Change marker for the top5. Before that reset all the markers.
  hilightTop5Stations(stations: any[]) {
    this.resetMarkers()
    stations.forEach(element => {
      var index = this.stations.findIndex(x => x.station_id == element.station_id)
      this.changeMarker(index)
    });
  }

  ngOnDestroy() {    
    this.map.clearAllEventListeners;
  };

  onMapReady(map: Map) {
    this.map = map
    this.map$.emit(map)
    this.zoom = map.getZoom()
    this.zoom$.emit(this.zoom)
    this.mapReady = true
  }

  onMapZoomEnd(e: ZoomAnimEvent) {
    this.zoom = e.target.getZoom()
    this.zoom$.emit(this.zoom)
  }
}
