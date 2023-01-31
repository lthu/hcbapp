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
  
  @Output() map$: EventEmitter<Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;

  // Id of station clicked on the map sent to the parent.
  @Output() stationId = new EventEmitter<number>();
  
  // Array of coordinates for each station received from parent component (StationsComponent)
  @Input() coordinates!: Station[];
  @Input() top5Stations!: number[];
  @Input() searchResultId: number = 0;
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
  iconDefault!: any;

  
  constructor(private ds: DataService, zone: NgZone) { 
    this.zone = zone;
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
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


    Marker.prototype.options.icon = this.iconDefault;
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.mapReady && !this.markersAdded) {
      var i = 0;

      // Adding marker for each station. Data received from parent component (StationsComponent)
      // 
      this.coordinates.forEach(element => {
        this.markers[i] = new Marker([element.coordinate_y, element.coordinate_x])
        .bindPopup("<h2> "+ element.name +" </h2> <br/>" + element.address + " " + element.city + "<br/>" + "Capacity: " + element.capacity)
        .on("mouseover", () => {console.log("hover" + element.station_id + " " + element.name)})
        .on("click", () =>{ 
          this.zone.run(() => {
            // this.getStationData(element.station_id);
            this.resetMarkers()
            this.stationId.emit(element.station_id)
          })
        })
        .addTo(this.map)
        this.markers[i]._icon.id = element.station_id;
        
        i++;
      });
      this.markersAdded = true;
    }
    if (this.searchResultId > 0) {
      this.map.closePopup()
      var index = this.coordinates.findIndex(x => x.station_id === changes['searchResultId'].currentValue);
      // var markerIndex = this.markers.findIndex(y => y._icon.id == index)
      // console.log("Markerindex: " + markerIndex);
      // console.log("Search result id from parent: " + changes['searchResultId'].currentValue + "And it's found at: " + index);
      this.map.panTo(latLng(this.coordinates[index].coordinate_y, this.coordinates[index].coordinate_x));
      this.map.zoomIn(5);
      this.markers[index].openPopup()
      
      
      this.stationId.emit(this.searchResultId);
      
      
    }
  }
  
  resetMarkers() {
    this.markers.forEach(element => {
      // this.markers[].setIcon(this.iconDefault)
      element.setIcon(this.iconDefault)

    });
  }

  hoverOnStation(id: number) {
    var index = this.coordinates.findIndex(x => x.station_id == id);
    // DomUtil.addClass(this.markers[index]._icon, 'blinking');
    this.changeMarker(index);
  }
  hoverOffStation(id: number) {
    var index = this.coordinates.findIndex(x => x.station_id == id);
    this.markers[index].setIcon(this.iconDefault)
  }

  changeMarker(markerIndex: number) {

    // var index = this.coordinates.findIndex(x => x.station_id == stationId);
    // var markerIndex = this.markers.findIndex(y => y._icon.id == index)

    const iconRetinaUrl = 'assets/marker-icon_hilighted.png';
    const iconUrl = 'assets/marker-icon_hilighted.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const newIcon = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [30, 49], // 25, 41
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
      });
    this.markers[markerIndex].setIcon(newIcon)
    // this.markers[markerIndex].setIcon(this.iconDefault)

  }
  hilightTop5Stations() {
    this.top5Stations.forEach(element => {
      var index = this.coordinates.findIndex(x => x.station_id == element);
      this.changeMarker(index)
    });
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
