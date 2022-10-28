import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {API_MAP_GEO} from "../constant/api.constant";
import {HttpClient, HttpRequest} from "@angular/common/http";
import * as Mapboxgl from 'mapbox-gl'
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {MapService} from "./map.service";
import {debounceTime} from "rxjs/operators";
import {ResponseCoordinateInfo} from "../shared/model/location.model";
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  constructor(private mapService:MapService) { }


  map:Mapboxgl.Map
  ngOnInit(): void {
    (Mapboxgl as any).accessToken = environment.mapboxKey;
    // this.getLocation()
  }
  createMarker(lng:number,lat:number){
    const marker = new Mapboxgl.Marker({
      draggable:true
    }).setLngLat([lat,lng]).addTo(this.map)
    // marker.on('drag',()=>{
    //   console.log(marker)
    //   let coordinate = marker.getLngLat();
    //   // console.log(coordinate.lng)
    //   // console.log(marker.getLngLat())
    // })
    // marker.on('mouseup',()=>{
    //   let coordinate = marker.getLngLat();
    //   console.log(coordinate.lng)
    // })
    // marker.on('mousedown',()=>{
    //   let coordinate = marker.getLngLat();
    //   console.log(coordinate.lng)
    // })
    marker.on('dragend',()=>{
      console.log('dropped')
      let coordinate = marker.getLngLat();
      this.mapService.markerLat = coordinate.lat
      this.mapService.markerLng = coordinate.lng
      this.getLocation()
      console.log(this.mapService.markerLat+"/"+this.mapService.markerLng)
    })
    // this.map.on('mouseup',()=>{
    //
    // })
  }

  getLocation(){
    // console.log(this.mapService.getGeoLocation())
    this.mapService.getGeoLocation().subscribe(responseCoordinateInfo=>{
      // let placeName = responseCoordinateInfo.features[0].place_name
      // console.log(placeName)
      console.log('leng: '+responseCoordinateInfo.features.length)
      console.log(JSON.stringify(responseCoordinateInfo.features[0].place_name))
    })
  }

  ngAfterViewInit(): void {
    this.map = new Mapboxgl.Map({
      container:'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.mapService.lng, this.mapService.lat],
      zoom:4.7
    });
    this.createMarker(16, 108)
    // this.getLocation()
    this.map.addControl(new MapboxGeocoder({
      accessToken: Mapboxgl.accessToken,
      mapboxgl: Mapboxgl
    }))

  }
}
