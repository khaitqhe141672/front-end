import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SearchTitleResponse} from "../shared/model/search-title.model";
import {API_SEARCH_DETAIL, API_SEARCH_MORE_BY_TITLE} from "../constant/api.constant";

@Injectable({providedIn:'root'})
export class SearchService{
  constructor(private http:HttpClient) {
  }
  searchMoreByTitle(data:string,pageIndex:number):Observable<SearchTitleResponse>{
    return this.http.post<SearchTitleResponse>(API_SEARCH_MORE_BY_TITLE+pageIndex,{
      searchText:data
    })
  }
  searchByFilter(statusVoucher:number,service:number[],roomTypeID:number,startDate:string,
                 minPrice:number,maxPrice:number,statusStar:number,statusSortPrice:number,
                 numberOfGuest:number,provinceID:number,indexPage:number):Observable<SearchTitleResponse>{
    console.log('------------------------------------')
    console.log('minPrice: '+minPrice)
    console.log('maxPriceCtrl: '+maxPrice)
    console.log('optionPriceCtrl: '+statusSortPrice)
    console.log('date: '+startDate)
    console.log('guestNumberCtrl: '+numberOfGuest)
    console.log(statusVoucher)
    console.log('roomTypeCtrl: '+roomTypeID)
    console.log('rateCtrl: '+statusStar)
    console.log('service: '+service)
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
}
