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
    let token = JSON.parse(localStorage.getItem('token'))
    console.log('this is a token: '+token)
    let headers: any = new Headers({
      'Content-type': 'multipart/form-data',
    });
    headers.append('Authorization',token)
    formData.append('file', file);

    // const req = new HttpRequest('POST', `${this.baseApiUrl}`, formData, {
    //   headers:headers,
    //   reportProgress: true,
    //   responseType: 'json'
    // });
    //
    // return this.http.request(req);
    return this.http.post(this.baseApiUrl,formData,{headers})
  }

  // getFiles(): Observable<any> {
  //   // return this.http.get(`${this.baseUrl}/files`);
  // }

}
