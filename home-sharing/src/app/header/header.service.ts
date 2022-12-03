import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SearchResponse} from "../shared/model/search.model";
import {API_SEARCH_FAST, API_SEARCH_MORE_BY_TITLE} from "../constant/api.constant";
import {SearchTitleResponse} from "../shared/model/search-title.model";

@Injectable({providedIn:'root'})
export class HeaderService{
  constructor(private http:HttpClient) {
  }


  searchData(data:string):Observable<SearchResponse>{
    console.log('data: '+data)
    return this.http.post<SearchResponse>(API_SEARCH_FAST,{searchText:data})
  }

}
