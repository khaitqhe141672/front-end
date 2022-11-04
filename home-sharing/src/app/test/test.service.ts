import {API_PUSH_SINGLE_IMG_POST} from "../constant/api.constant";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {H} from "@angular/cdk/keycodes";
@Injectable({providedIn:'root'})
export class TestService{
  private baseUrl = API_PUSH_SINGLE_IMG_POST+3;

  constructor(private http: HttpClient) { }
  // headerOption = new HttpHeaders()
  baseApiUrl = 'http://localhost:8080/api/posting/insert-post-image-one?post-id=3';




  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    // this.headerOption.append('Content-Type','multipart/form-data')
    formData.append('file', file,file.name);


  const headers = new HttpHeaders({"Content-Type":"multipart/form-data",'Test-xem':'ahihi'});
    return this.http.post(this.baseApiUrl,formData, {headers : new HttpHeaders({ 'Content-Type':'multipart/form-data'})});
  }

  // getFiles(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}`);
  // }

}
