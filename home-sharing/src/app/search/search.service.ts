import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SearchTitleResponse} from "../shared/model/search-title.model";
import {API_SEARCH_MORE_BY_TITLE} from "../constant/api.constant";

@Injectable({providedIn:'root'})
export class SearchService{
  constructor(private http:HttpClient) {
  }
  searchMoreByTitle(data:string,pageIndex:number):Observable<SearchTitleResponse>{
    return this.http.post<SearchTitleResponse>(API_SEARCH_MORE_BY_TITLE+pageIndex,{
      searchText:data
    })
  }
}
