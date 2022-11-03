import {HttpClient} from "@angular/common/http";
import {API_MAP_GEO} from "../constant/api.constant";
import {environment} from "../../environments/environment.prod";
import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {ResponseCoordinateInfo} from "../shared/model/location.model";
@Injectable({providedIn:'root'})
export class MapService{
  constructor(private http:HttpClient) {
  }
  addressChanged = new Subject<string>()

  getGeoLocation():Observable<ResponseCoordinateInfo> {
    // console.log('marker: '+this.markerLat+"/"+this.markerLng)
    console.log(API_MAP_GEO+this.markerLng+","+this.markerLat+".json?language=vi&access_token="+environment.mapboxKey)
    return this.http.get<any>(API_MAP_GEO+this.markerLng+","+this.markerLat+".json?language=vi&access_token="+environment.mapboxKey)
    // return this.http.get<any>('https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?access_token=pk.eyJ1IjoiZGluaGR1YzI1NTAiLCJhIjoiY2w5czdvZ3ZxMWlvdTN2bzVxeWlkOW91ZiJ9.9pgJl1pbYV0JAEceiGCXkQ')
  }
  lat = 16;
  lng = 108;
  markerLat:number=16;
  markerLng:number=108
}
