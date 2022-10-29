import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {District, Province, ResponseDistrict, ResponseProvince} from "../../shared/model/district.model";
import {
  API_DISTRICT,
  API_GET_DISTRICT_BY_PROVINCE, API_MAP_GEO,
  API_POSTING,
  API_PROVINCE,
  API_ROOM_TYPE, API_UTILITYS
} from "../../constant/api.constant";
import {map} from "rxjs/operators";
import {ResponseRoom} from "../../shared/model/room-type.model";
import {ResponseDistrictByProvince} from "./district.model";
import {Post} from "../post.model";
import {UtilitiesResponse} from "../../shared/model/utility.model";
import {environment} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class PostEditService{
  private baseUrl = 'http://localhost:8080';
  httpOptions ={
    headers:new HttpHeaders({'Content-Type':'Application/json'})
  }
  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }

  //load district and province
  getDistricts():Observable<ResponseDistrict>{
    return this.http.get<ResponseDistrict>(API_DISTRICT)
  }
  getProvince():Observable<ResponseProvince>{
    return this.http.get<ResponseProvince>(API_PROVINCE)
  }
  getRoomType():Observable<ResponseRoom>{
    return this.http.get<ResponseRoom>(API_ROOM_TYPE)
  }
  getDistrictsByProvinceID(id:number):Observable<ResponseDistrictByProvince>{
    return this.http.get<ResponseDistrictByProvince>(API_GET_DISTRICT_BY_PROVINCE+id)
  }
  pushPost(roomTypeID:number,districtID:number,provinceID:number,post:Post){
    return this.http.post(API_POSTING,{
      roomTypeID:roomTypeID,
      address:post.address,
      districtID: districtID,
      guestNumber:post.guestNumber,
      numberOfBathrooms:post.numberOfBathrooms,
      numberOfBedrooms:post.numberOfBedrooms,
      numberOfBeds:post.numberOfBeds,
      title:post.title,
      description: post.description,
      price: post.price,
      utilityRequests: JSON.stringify(post.postUtilityDtoList),
      voucherID: post.postID,
      paymentPackageID: 1
    })
  }
  getUtility():Observable<UtilitiesResponse>
  {
    return this.http.get<UtilitiesResponse>(API_UTILITYS)
  }
  getGeoLocation(lat:number,lng:number) {
    console.log(API_MAP_GEO+lat+","+lng+".json?access_token="+environment.mapboxKey)
    return this.http.get<any>(API_MAP_GEO+lng+","+lat+".json?access_token="+environment.mapboxKey)
  }
}
