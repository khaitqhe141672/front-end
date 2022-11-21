import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {ResponseDistrict, ResponseProvince} from "../../shared/model/district.model";
import {
  API_DISTRICT, API_DOWNLOAD_IMG,
  API_GET_DISTRICT_BY_PROVINCE,
  API_MAP_GEO,
  API_POSTING,
  API_PROVINCE,
  API_PUSH_IMG_POST,
  API_PUSH_SINGLE_IMG_POST,
  API_ROOM_TYPE,
  API_SERVICE_POST, API_UPDATE_IMG_POST, API_UPDATE_POSTING,
  API_UTILITYS,
  API_VOUCHER, API_VOUCHER_HOST
} from "../../constant/api.constant";
import {catchError, map, tap} from "rxjs/operators";
import {ResponseRoom} from "../../shared/model/room-type.model";
import {ResponseDistrictByProvince} from "./district.model";
import {Post} from "../post.model";
import {UtilitiesResponse} from "../../shared/model/utility.model";
import {environment} from "../../../environments/environment.prod";
import {VoucherResponse} from "../../shared/model/voucher.model";
import {ResponseService} from "../../shared/model/serivce-post.model";
import {ImgEditResponse} from "./img-edit.model";
import {File} from "@angular/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system";

@Injectable({
  providedIn: 'root'
})
export class PostEditService {
  private baseUrl = API_PUSH_SINGLE_IMG_POST;

  constructor(private http: HttpClient) {
  }

  // uploadByAPI(file: File): Observable<any> {
  //   console.log('pushing')
  //   let formData: FormData = new FormData();
  //   let token = JSON.parse(localStorage.getItem('token'))
  //   console.log('this is a token: ' + token)
  //   let headers: any = new Headers({
  //     'Content-type': 'multipart/form-data',
  //   });
  //   headers.append('Authorization', token)
  //   formData.append('file', file);
  //
  //   return this.http.post(API_PUSH_IMG_POST + 3, formData, {
  //     headers,
  //     reportProgress: true,
  //     responseType: 'json'
  //   });
  // }

  uploadAllFileByAPI(isEditPost:boolean,formData: FormData, postID: number): Observable<any> {
    let api = isEditPost?API_UPDATE_IMG_POST+postID:API_PUSH_IMG_POST+postID
    console.log('pushing')
    console.log('postID upload img: '+postID)
    let token = JSON.parse(localStorage.getItem('token'))
    console.log('this is a token: ' + token)
    let headers: any = new Headers({
      'Content-type': 'multipart/form-data',
    });
    headers.append('Authorization', token)
    return isEditPost?this.http.put(api, formData, {
      headers,
      reportProgress: true,
      responseType: 'json'
    }):this.http.post(api, formData, {
      headers,
      reportProgress: true,
      responseType: 'json'
    });
  }

  //load district and province
  getDistricts(): Observable<ResponseDistrict> {
    return this.http.get<ResponseDistrict>(API_DISTRICT)
  }

  getProvince(): Observable<ResponseProvince> {
    return this.http.get<ResponseProvince>(API_PROVINCE)
  }

  getRoomType(): Observable<ResponseRoom> {
    return this.http.get<ResponseRoom>(API_ROOM_TYPE)
  }

  getDistrictsByProvinceID(id: number): Observable<ResponseDistrictByProvince> {
    return this.http.get<ResponseDistrictByProvince>(API_GET_DISTRICT_BY_PROVINCE + id)
  }

  getImgFile(postID:number):Observable<string[]>{
    return this.http.get<ImgEditResponse>(API_DOWNLOAD_IMG+postID).pipe(map(data=>data.object))
  }

  pushPost(post: Post, latitude: number, longitude: number, utilityRequests: number[], voucherList: number[],
           postServiceRequests: { serviceID: number, price: number }[]) {
    let apiPost = post.postID?API_UPDATE_POSTING+ post.postID:API_POSTING
    // console.log('---------------------------------------------------')
    // console.log('1.id: ' +  post.postID)
    //
    // console.log('1.room: ' +  post.roomTypeID)
    // console.log('2.address: ' + post.address)
    // console.log('3.guest: ' + post.guestNumber)
    // console.log('4.number of Bath: ' + post.numberOfBathrooms)
    // console.log('5.number of Room: ' +  post.numberOfBedrooms)
    // console.log('6.number of bed: ' +  post.numberOfBeds)
    //
    // console.log('7.title: ' + post.title)
    // console.log('8.description: ' + post.description)
    // console.log('9.priceHS: ' +  post.price)
    // console.log('10.utility: ' + JSON.stringify(utilityRequests))
    // console.log('11.voucher: ' + JSON.stringify(voucherList))
    // console.log('12.lat: '+latitude)
    // console.log('13.lng: '+longitude)
    // // console.log('service post: ' + JSON.stringify(this.saveService))
    console.log('14.service post: ' +  JSON.stringify(postServiceRequests))
    // console.log('15."paymentPackageID": 1')
    // console.log('---------------------------------------------------')
    return !post.postID?this.http.post(apiPost, {
      roomTypeID: post.roomTypeID,
      address: post.address,
      // districtID: districtID,
      guestNumber: post.guestNumber,
      numberOfBathrooms: post.numberOfBathrooms,
      numberOfBedrooms: post.numberOfBedrooms,
      numberOfBeds: post.numberOfBeds,

      title: post.title,
      description: post.description,
      price: post.price,
      // utilityRequests: JSON.stringify(utilityRequests),
      utilityRequests: utilityRequests,
      voucherList: voucherList,
      paymentPackageID: 1,
      latitude: latitude,
      longitude: longitude,
      postServiceRequests: postServiceRequests
    }).pipe(catchError(this.handleErrorPushPost), tap(responseData => {
      console.log('res1:' + responseData)
    })):this.http.put(apiPost, {
      roomTypeID: post.roomTypeID,
      address: post.address,
      // districtID: districtID,
      guestNumber: post.guestNumber,
      numberOfBathrooms: post.numberOfBathrooms,
      numberOfBedrooms: post.numberOfBedrooms,
      numberOfBeds: post.numberOfBeds,

      title: post.title,
      description: post.description,
      price: post.price,
      // utilityRequests: JSON.stringify(utilityRequests),
      utilityRequests: utilityRequests,
      voucherList: voucherList,
      paymentPackageID: 1,
      latitude: latitude,
      longitude: longitude,
      postServiceRequests: postServiceRequests
    }).pipe(catchError(this.handleErrorPushPost), tap(responseData => {
      console.log('res1:' + responseData)
    }))
  }



  getUtility(): Observable<UtilitiesResponse> {
    return this.http.get<UtilitiesResponse>(API_UTILITYS)
  }

  getGeoLocation(lat: number, lng: number) {
    console.log(API_MAP_GEO + lat + "," + lng + ".json?access_token=" + environment.mapboxKey)
    return this.http.get<any>(API_MAP_GEO + lng + "," + lat + ".json?access_token=" + environment.mapboxKey)
  }

  getVoucher(): Observable<VoucherResponse> {
    return this.http.get<VoucherResponse>(API_VOUCHER_HOST)
  }

  getService(): Observable<ResponseService> {
    return this.http.get<ResponseService>(API_SERVICE_POST)
  }

  private handleErrorPushPost(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!'
    console.log('error: ' + errorResponse.error.message)
    if (!errorResponse.error.status || !errorResponse.error.message) {
      return throwError(() => new Error(errorMessage))
    }
    return throwError(() => new Error(errorResponse.error.message))
  }
}
