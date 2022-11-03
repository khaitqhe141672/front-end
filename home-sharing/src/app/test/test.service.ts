import {API_PUSH_SINGLE_IMG_POST} from "../constant/api.constant";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
@Injectable({providedIn:'root'})
export class TestService{
  private baseUrl = API_PUSH_SINGLE_IMG_POST+3;

  constructor(private http: HttpClient) { }
  header = new Headers()
  baseApiUrl = 'http://localhost:8080/api/posting/insert-post-image-one?post-id=3';



  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

}
