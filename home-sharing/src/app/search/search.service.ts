import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SearchTitleResponse} from "../shared/model/search-title.model";
import {
  API_PROVINCE,
  API_SEARCH_DETAIL,
  API_SEARCH_MORE_BY_PROVINCE,
  API_SEARCH_MORE_BY_TITLE
} from "../constant/api.constant";
import {ResponseProvince} from "../shared/model/district.model";

@Injectable({providedIn:'root'})
export class SearchService{
  constructor(private http:HttpClient) {
  }
  searchMoreByTitle(data:string,pageIndex:number):Observable<SearchTitleResponse>{
    return this.http.post<SearchTitleResponse>(API_SEARCH_MORE_BY_TITLE+pageIndex,{
      searchText:data
    })
  }
  searchMoreByProvince(data:string,pageIndex:number):Observable<SearchTitleResponse>{
    return this.http.post<SearchTitleResponse>(API_SEARCH_MORE_BY_PROVINCE+pageIndex,{
      searchText:data
    })
  }
  searchByFilter(statusVoucher:number,service:number[],roomTypeID:number,startDate:string,
                 minPrice:number,maxPrice:number,statusStar:number,statusSortPrice:number,
                 numberOfGuest:number,provinceID:number, textSearch: string, typeSearch: number,indexPage:number):Observable<SearchTitleResponse>{
    console.log('------------------------------------')
    console.log('minPrice: '+minPrice)
    console.log('maxPriceCtrl: '+maxPrice)
    console.log('optionPriceCtrl: '+statusSortPrice)
    console.log('date: '+startDate)
    console.log('guestNumberCtrl: '+numberOfGuest)
    console.log('statusVoucher: '+statusVoucher)
    console.log('roomTypeCtrl: '+roomTypeID)
    console.log('rateCtrl: '+statusStar)
    console.log('service: '+service)
    console.log('provinceID: '+provinceID)
    return this.http.post<SearchTitleResponse>(API_SEARCH_DETAIL+indexPage,{
      statusVoucher:statusVoucher,
      service:service.length==0?[]:service,
      roomTypeID:roomTypeID,
      startDate:startDate,
      minPrice:minPrice,
      maxPrice:maxPrice,
      statusStar:statusStar,
      statusSortPrice:statusSortPrice,
      numberOfGuest:numberOfGuest,
      provinceID:provinceID
    })
  }
  getProvince(): Observable<ResponseProvince> {
    return this.http.get<ResponseProvince>(API_PROVINCE)
  }
}
