import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Map, Control, DomUtil, ZoomAnimEvent , Layer, MapOptions, tileLayer, latLng } from 'leaflet';
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
  @Input() x_coordinate! : number;
  @Input() y_coordinate! : number;
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

  constructor() { 
  }

  ngOnInit() {
    
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['x_coordinate'] && this.mapReady) {
      
      this.x = changes['x_coordinate'].currentValue
      this.y = changes['y_coordinate'].currentValue
      L.marker([this.y, this.x]).addTo(this.map);
      console.log("x " + this.x + " y " + this.y) 
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
