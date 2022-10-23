import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {District, Province, ResponseDistrict, ResponseProvince} from "../../shared/model/district.model";
import {API_DISTRICT, API_PROVINCE, API_ROOM_TYPE} from "../../constant/api.constant";
import {map} from "rxjs/operators";
import {ResponseRoom} from "../../shared/model/room-type.model";

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
}
