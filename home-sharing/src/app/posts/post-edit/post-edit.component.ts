import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {PostEditService} from "./post-edit.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true}
    }
  ]
})
export class PostEditComponent implements OnInit {
  formGroupPost: FormGroup;
  typeHomeStay = [
    'Chung cư', 'Bungalow', 'Phòng lẻ', 'Biệt thự sân vườn', 'Nhà phố', 'Nhà sàn truyền thống',
    'Nhà thôn dã', 'Nhà cabin', 'Căn hộ cao cấp'
  ]
  //Upload Image
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  isServicePost = true
  constructor(private fb: FormBuilder, private postEditService: PostEditService) {

  }

  get ServicesPost(): FormArray {
    return this.formGroupPost.get('servicePost') as FormArray
  }

  ngOnInit(): void {
    this.initForm();
    this.imageInfos = this.postEditService.getFiles();
  }

  initForm() {
    let servicePost = new FormArray([])
    this.formGroupPost = this.fb.group({
      name: [''],
      address: [''],
      type: [''],
      description: [''],
      priceHS: [''],
      servicePost: this.fb.array(
        [
          this.fb.group({
            serviceName: [''],
            servicePrice: ['']
          })
        ]
      ),
      image: [''],
    })
  }

  onAddService() {
    this.ServicesPost.push(this.fb.group({
      serviceName: [''],
      servicePrice: ['']
    }))
    this.isServicePost = true
  }

  onDeleteService(i:number){

    if(this.ServicesPost.length<=1){
      this.isServicePost = false
      return
    }
    this.ServicesPost.removeAt(i)
  }
  moveImgUp(index: number) {
    console.log('Move Up index: '+index)

    // if(index<=0){
    //   return
    // }
    // let previousIndex:number = index - 1;
    // [this.previews[index], this.previews[previousIndex]] = [this.previews[index], this.previews[previousIndex]];
    // console.log('Move Up')
  }
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
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

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
    for (let i of this.previews) {
      console.log('preview' + i)
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = {value: 0, fileName: file.name};

    if (file) {
      this.postEditService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.imageInfos = this.postEditService.getFiles();
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        }
      );
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



}
