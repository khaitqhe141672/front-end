import {Injectable, OnInit} from "@angular/core";
import {Post} from "./post.model";
import {DataStorageService} from "../shared/data-storage.service";
import {HttpClient} from "@angular/common/http";
import * as mapboxgl from 'mapbox-gl'
import {environment} from "../../environments/environment.prod";

@Injectable({providedIn:'root'})
export class PostService {
  constructor(private http:HttpClient) {
  }

}
