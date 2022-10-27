import {Injectable} from "@angular/core";
import {Post} from "./post.model";
import {DataStorageService} from "../shared/data-storage.service";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn:'root'})
export class PostService{
  constructor(private http:HttpClient) {
  }
  getData() {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/users')
  }
}
