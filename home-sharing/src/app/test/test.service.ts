import {API_PUSH_SINGLE_IMG_POST} from "../constant/api.constant";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
@Injectable({providedIn:'root'})
export class TestService{
  private baseUrl = API_PUSH_SINGLE_IMG_POST+3;

  constructor(private http: HttpClient) { }
  header = new Headers()
  baseApiUrl = 'http://localhost:8080/api/posting/insert-post-image-one?post-id=3';

token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5ZXV0aGF0eGEyMDQiLCJpYXQiOjE2NjczMzE2NjgsImV4cCI6MTY2NzQxODA2OH0.FbiHfg3fwvRsWYImuOxiOC6I_qXQqxrlagX5tACF5CbumsOJM5Xo9ALgR5ccdEkyDI16rwPrVSgQk5JPrCE-yw'



  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseApiUrl}`, formData, {


      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

}
