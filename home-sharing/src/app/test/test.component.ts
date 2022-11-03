import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpEventType, HttpHeaders, HttpResponse} from "@angular/common/http";
import {TestService} from "./test.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {API_PUSH_IMG_POST, API_PUSH_SINGLE_IMG_POST} from "../constant/api.constant";
import {PostEditService} from "../posts/post-edit/post-edit.service";
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {$e} from "@angular/compiler/src/chars";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  // header = new Headers()
  public files: NgxFileDropEntry[] = [];
  constructor(private fb: FormBuilder,private http: HttpClient,private testService:TestService,private postEditService:PostEditService) { }

  ngOnInit(): void {
    // this.fileInfos = this.testService.getFiles();
    // this.header.set('Content-Type','multipart/form-data')
    // this.header.set('User-Agent','PostmanRuntime/7.29.2')
    // this.header.set('Accept','*/*')
    // this.header.set('Accept-Encoding','gzip, deflate, br')
    // this.header.set('Connection','keep-alive')
  }
  selectedFiles: FileList;
  progressInfos = [];
  message = '';

  fileInfos: Observable<any>;
  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }
  uploadFiles() {
    this.message = '';

    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }
  upload(idx, file) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    this.testService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.testService.getFiles();
        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
  }
}
