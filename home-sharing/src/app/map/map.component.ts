import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {API_MAP_GEO} from "../constant/api.constant";
import {HttpClient, HttpRequest} from "@angular/common/http";
import * as Mapboxgl from 'mapbox-gl'
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {MapService} from "./map.service";
import {catchError, debounceTime} from "rxjs/operators";
import {ResponseCoordinateInfo} from "../shared/model/location.model";
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import {PostService} from "../posts/post.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {
  @Output() addressEvent = new EventEmitter<string>();
  @Input() lat = 16
  @Input() lng = 108
  @Input() isEditMode = false
  @Input() isDetailMode = false
  address: string = null
  map: Mapboxgl.Map
  marker: any

  constructor(private mapService: MapService, private postService: PostService) {
  }

  sendAddress() {
    return this.addressEvent.emit(this.address)
  }

  ngOnInit(): void {
    (Mapboxgl as any).accessToken = environment.mapboxKey;
    console.log('lat: ' + this.lat)
    console.log('lng: ' + this.lng)
    // this.getLocation()
  }

  createMarker(lng: number, lat: number) {

    console.log('lat 2: ' + this.lat)
    console.log('lng 2: ' + this.lng)
    if (!lng && !lat) {
      lng = 16
      lat = 108
    }
    // if(lat>90||lat<-90) lat = 108

    if (this.isDetailMode) {
      this.marker = new Mapboxgl.Marker({
        draggable: false
      }).setLngLat([lat, lng]).addTo(this.map)
    } else {
      this.marker = new Mapboxgl.Marker({
        draggable: true
      }).setLngLat([lat, lng]).addTo(this.map)
    }
    if (this.isDetailMode) {
      // this.marker.dragging.disable()
      return
    }

   try{
      this.marker.on('dragend', () => {
        console.log('dropped')
        let coordinate = this.marker.getLngLat();
        this.mapService.markerLat = coordinate.lat
        this.mapService.markerLng = coordinate.lng
        this.getLocation()
        console.log(this.mapService.markerLat + "/" + this.mapService.markerLng)
      })
      this.map.on('click', (e) => {
        console.log(e.lngLat.lng)
        this.mapService.markerLat = e.lngLat.lat
        this.mapService.markerLng = e.lngLat.lng
        this.marker.setLngLat([this.mapService.markerLng, this.mapService.markerLat]).addTo(this.map)
        this.getLocation()
      })
    }catch (e) {
     
   }
  }

  getLocation() {
    this.mapService.getGeoLocation().subscribe(responseCoordinateInfo => {
      let placeName = responseCoordinateInfo.features[0].place_name
      console.log(placeName)
      this.address = placeName
      this.mapService.addressChanged.next(placeName)
    })
  }

  ngAfterViewInit(): void {
    this.map = new Mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.lng ? this.lng : this.mapService.lng, this.lat ? this.lat : this.mapService.lat],
      // center: [105,21],
      zoom: (this.lng && this.lat) ? 9 : 4.5
    });
    if (!this.isEditMode && !this.isDetailMode) this.createMarker(16, 108)
    if (this.isDetailMode) {
      this.createMarker(+this.lat, +this.lng)
    }

    this.map.addControl(new MapboxGeocoder({
      accessToken: Mapboxgl.accessToken,
      marker: false,
      mapboxgl: Mapboxgl
    }))
    this.map.addControl(new Mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    }));
    const language = new MapboxLanguage();
    this.map.addControl(language);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isEditMode) {
      console.log('changes: ' + JSON.stringify(changes))
      console.log('lat: ' + this.lat + ' / lng: ' + this.lng)
      let lat = changes.lat.currentValue
      let lng = changes.lng.currentValue
      this.createMarker(lat, lng)
      this.mapService.markerLat = lat
      this.mapService.markerLng = lng
      this.getLocation()
    }
  }
}
