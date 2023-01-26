import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Map, Control, DomUtil, ZoomAnimEvent , Layer, MapOptions, tileLayer, latLng } from 'leaflet';
import { icon, Marker } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  styleUrls: ['./map.component.css'],
  template: `
  <div class="map-container" leaflet
     [leafletOptions]="options"
     (leafletMapReady)="onMapReady($event)"
     
    ></div>`
})
export class MapComponent implements OnInit, OnDestroy {
  @Output() map$: EventEmitter<Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;
  @Input() departureX! : number;
  @Input() departureY! : number;
  @Input() returnX! : number;
  @Input() returnY! : number;
  @Input() options: MapOptions= {
                      layers:[tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        opacity: 1,
                        maxZoom: 19,
                        detectRetina: true,
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      })],
                      zoom:12,
                      center:latLng(60.179750209022,24.9554449266327)
  };
  public map!: Map;
  public zoom!: number;
  public x!: number;
  public y!: number;
  public mapReady: boolean = false;
  private greenIcon;
  
  constructor() { 
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
  this.greenIcon = L.icon({
    iconUrl: 'assets/marker-icon_start.png',
    shadowUrl: 'assets/marker-shadow.png',

    iconSize:     [25, 41], // size of the icon
    shadowSize:   [41, 41], // size of the shadow
    iconAnchor:   [12, 41], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

  }

  ngOnInit() {
    
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.mapReady) {
      
      this.departureX = changes['departureX'].currentValue
      this.departureY = changes['departureY'].currentValue
      this.returnX = changes['returnX'].currentValue
      this.returnY = changes['returnY'].currentValue
      L.marker([this.departureY, this.departureX]).addTo(this.map);
      L.marker([this.returnY, this.returnX],{icon: this.greenIcon}).addTo(this.map);
      
    }
    
    
    
  }
 
  ngOnDestroy() {
    console.log("DESTROYED");
     this.map.clearAllEventListeners;
    // this.map.remove();
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
