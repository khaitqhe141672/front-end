import {Injectable, OnInit} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable, Subject, throwError} from "rxjs";
import {District, Province, ResponseDistrict, ResponseProvince} from "../../shared/model/district.model";
import {
  API_DISTRICT,
  API_GET_DISTRICT_BY_PROVINCE, API_MAP_GEO,
  API_POSTING,
  API_PROVINCE, API_PUSH_IMG_POST, API_PUSH_SINGLE_IMG_POST,
  API_ROOM_TYPE, API_SERVICE_POST, API_UTILITYS, API_VOUCHER
} from "../../constant/api.constant";
import {catchError, map, tap} from "rxjs/operators";
import {ResponseRoom} from "../../shared/model/room-type.model";
import {ResponseDistrictByProvince} from "./district.model";
import {Post} from "../post.model";
import {UtilitiesResponse} from "../../shared/model/utility.model";
import {environment} from "../../../environments/environment.prod";
import {VoucherResponse} from "../../shared/model/voucher.model";
import {ResponseService} from "../../shared/model/serivce-post.model";

@Injectable({
  providedIn: 'root'
})
export class PostEditService{
  private baseUrl = API_PUSH_SINGLE_IMG_POST;

  constructor(private http: HttpClient) { }

  uploadByAPI(file: File): Observable<HttpEvent<any>> {
    console.log('pushing')
    let formData: FormData = new FormData();
    let headers: any = new Headers();
    headers.append('Content-type', undefined);
    formData.append('file', file);

    const req = new HttpRequest('POST',
      API_PUSH_SINGLE_IMG_POST+'3',
      formData, headers);
    formData = new FormData()
    return this.http.request(req);
  }

  uploadByAPI2(fileList: FileList): Observable<HttpEvent<any>> {
    console.log('pushing')
    let formData: FormData = new FormData();
    let fileLength = fileList.length
    for (let i=0;i< fileLength;i++){
      formData.append(fileList[i].name,fileList[i])
    }

    const req = new HttpRequest('POST', API_PUSH_IMG_POST+'3', formData, {
      reportProgress: true,
      responseType: 'json',
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
  pushPost(roomTypeID:number,post:Post,latitude:number,longitude:number,utilityRequests:number[],voucherList:number[],
           postServiceRequests:{serviceID:number,price:number}[]){
    return this.http.post(API_POSTING,{
      roomTypeID:roomTypeID,
      address:post.address,
      // districtID: districtID,
      guestNumber:post.guestNumber,
      numberOfBathrooms:post.numberOfBathrooms,
      numberOfBedrooms:post.numberOfBedrooms,
      numberOfBeds:post.numberOfBeds,

      title:post.title,
      description: post.description,
      price: post.price,
      // utilityRequests: JSON.stringify(utilityRequests),
      utilityRequests:utilityRequests,
      voucherList: voucherList,
      paymentPackageID: 1,
      latitude:latitude,
      longitude:longitude,
      postServiceRequests:postServiceRequests
    }).pipe(catchError(this.handleErrorPushPost),tap(responseData=>{
      console.log(responseData)
    }))
  }
  getUtility():Observable<UtilitiesResponse>
  {
    return this.http.get<UtilitiesResponse>(API_UTILITYS)
  }
  getGeoLocation(lat:number,lng:number) {
    console.log(API_MAP_GEO+lat+","+lng+".json?access_token="+environment.mapboxKey)
    return this.http.get<any>(API_MAP_GEO+lng+","+lat+".json?access_token="+environment.mapboxKey)
  }

  getVoucher():Observable<VoucherResponse>{
    return this.http.get<VoucherResponse>(API_VOUCHER)
}

  getService():Observable<ResponseService> {
    return this.http.get<ResponseService>(API_SERVICE_POST)
  }
  private handleErrorPushPost(errorResponse:HttpErrorResponse){
    let errorMessage = 'An unknown error occurred!'
    console.log('error: '+errorResponse.error.message)
    if(!errorResponse.error.status||!errorResponse.error.message){
      return throwError(()=>new Error(errorMessage))
    }
    return throwError(()=>new  Error(errorResponse.error.message))
  }
}
