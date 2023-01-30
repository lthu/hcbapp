import { NgZone, HostListener ,Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges, AfterViewInit } from '@angular/core';
import { Map, Control, DomUtil, ZoomAnimEvent , Layer, MapOptions, tileLayer, latLng, icon, Marker, LayerGroup} from 'leaflet';
import { DataService } from '../data.service';
import { Station, StationDetails } from '../model/station';



@Component({
  selector: 'app-station-map',
  styleUrls: ['./map.component.css'],
  template: `
  <p>{{stationDetails}}</p>
  <button (click)="markerTest()"> B</button>
  <div class="map-container" leaflet
     [leafletOptions]="options"
     (leafletMapReady)="onMapReady($event)"></div>`
})

export class StationMapComponent implements OnDestroy {
  
  @Output() map$: EventEmitter<Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;
  
  // Array of coordinates for each station received from parent component (StationsComponent)
  @Input() coordinates!: Station[];
  @Input() options: MapOptions = {
                      layers:[tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        opacity: 1,
                        maxZoom: 19,
                        detectRetina: true,
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      })],
                      zoom:12,
                      center:latLng(60.179750209022,24.9554449266327),
  };
  zone!: NgZone
  public markers: any[] = new Array();
  stationDetails: any = 'test'
  stationData!: StationDetails[]
  public map!: Map;
  public zoom!: number;
  public mapReady: boolean = false;
  public markersAdded: boolean = false;

  
  constructor(private ds: DataService, zone: NgZone) { 
    this.zone = zone;
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
      });


    Marker.prototype.options.icon = iconDefault;

  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.mapReady && !this.markersAdded) {
      var i = 0;

      this.coordinates.forEach(element => {
        this.markers[i] = new Marker([element.coordinate_y, element.coordinate_x])
        .bindPopup("<h2> "+ element.name +" </h2> <br/>" + element.address + " " + element.city + "<br/>" + "Capacity: " + element.capacity)
        .on("click", () =>{ 
          this.zone.run(() => {
            this.stationDetails = element.name
            this.markerTest();
          })
        })
        .addTo(this.map)
        this.markers[i]._icon.id = element.station_id;
      });
      i++;
      this.markersAdded = true;
    }
  }
  
  run() {
    this.stationDetails = 'moi'
    
  }
  
  test() {
    this.run();
    
  }
  
  markerTest() {
    const iconRetinaUrl = 'assets/marker-icon_hilighted.png';
    const iconUrl = 'assets/marker-icon_hilighted.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const newIcon = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
      });
    var getMarker = this.markers[0];
    console.log(this.markers[0])
    getMarker.setIcon(newIcon)
  }

  ngOnDestroy() {    
    this.map.clearAllEventListeners;
    this.map.remove();
  };

  onMapReady(map: Map) {
    this.map = map;
    this.map$.emit(map);
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);
    this.mapReady = true;
  }

  onMapZoomEnd(e: ZoomAnimEvent) {
    this.zoom = e.target.getZoom();
    this.zoom$.emit(this.zoom);
  }

}
