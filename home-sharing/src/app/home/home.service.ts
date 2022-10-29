import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {
  API_HOME_INTERESTING_PLACE,
  API_HOME_POST_TOP_RATE,
  API_HOME_RECOMMENDED_PLACES
} from "../constant/api.constant";
import {InterestingPlaceResponse} from "../shared/model/InterestingPlace.model";
import {RecommendedPlaceResponse} from "../shared/model/RecommendedPlace.model";
import {PostTopRate, ResponsePostTopRate} from "../shared/model/PostYopRate.model";

@Injectable({providedIn: 'root'})
export class HomeService {
  constructor(private http: HttpClient) {
  }

  getRecommendedData(): Observable<RecommendedPlaceResponse> {
    return this.http.get<RecommendedPlaceResponse>(API_HOME_RECOMMENDED_PLACES);
  }

  getInterestingPlaceData(): Observable<InterestingPlaceResponse> {
    return this.http.get<InterestingPlaceResponse>(API_HOME_INTERESTING_PLACE);
  }

  getPostTopRateData(): Observable<ResponsePostTopRate> {
    return this.http.get<ResponsePostTopRate>(API_HOME_POST_TOP_RATE);
  }
}
