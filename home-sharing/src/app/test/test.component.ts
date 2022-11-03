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
  form: FormGroup;
  file: File;

  constructor(private fb: FormBuilder, private http: HttpClient,private testService:TestService) {}


  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }
  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }
  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.testService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            // this.imageInfos = this.testService.getFiles();
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        });
    }
  }

  ngOnInit(): void {
  }
}
