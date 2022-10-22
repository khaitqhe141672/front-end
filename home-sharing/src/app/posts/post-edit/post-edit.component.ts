import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {PostEditService} from "./post-edit.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

declare var $: any;

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

  imgPositionChanged = new Subject<FileList>()
  imgPreviewPositionChanged = new Subject<string[]>()

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

  onDeleteService(i: number) {

    if (this.ServicesPost.length <= 1) {
      this.isServicePost = false
      return
    }
    this.ServicesPost.removeAt(i)
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
      // console.log('preview' + i)
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

  ngAfterViewInit() {
    $(document).ready(function () {
      $(document).on('click', '.dropbtn2', function () {
        $('.dropbtn2').not(this).next().removeClass('show');
        $(this).next().toggleClass('show');
      });
      $(document).on('click', function (e) {
        if (!$(e.target).closest('.dropbtn2').length)
          $('.dropbtn2').next().removeClass('show');
      });
    });
    $('#img4').click(function () {
      $('#fileInput2').trigger('click');
    });

  }


  // selectedFiles?: FileList;
  // selectedFileNames: string[] = [];
  // progressInfos: any[] = [];
  // message: string[] = [];
  // previews: string[] = [];
  // imageInfos?: Observable<any>;
  // isServicePost = true

  onChangePositionImg(event, pos1: number, pos2: number) {
    // console.log(this.previews[pos1]);
    // console.log(this.previews[pos2]);
    if (!this.previews[pos2]) return

    [[this.previews[pos1]], [this.previews[pos2]]] = [[this.previews[pos2]], [this.previews[pos1]]];
    [[this.selectedFileNames[pos1]], [this.selectedFileNames[pos2]]] = [[this.selectedFileNames[pos2]], [this.selectedFileNames[pos1]]];
    [[this.selectedFiles[pos1]], [this.selectedFiles[pos2]]] = [[this.selectedFiles[pos2]], [this.selectedFiles[pos1]]];

    this.imgPreviewPositionChanged.next(this.previews.slice())
    this.imgPreviewPositionChanged.next(this.selectedFileNames.slice())
    // console.log(this.previews[pos1]);
    // console.log(this.previews[pos2]);
  }

  onDeleteImg($event, position: number) {
    // this.imgPreviewPositionChanged.next(this.previews.splice(position, 1)) xoa anh va day arr len
    this.previews[position] = undefined
    this.imgPreviewPositionChanged.next(this.previews.slice())

  }


  selectSingleFiles(event, position: number) {
    this.selectedFiles = event.target.files
    if (event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(e.target.result);
        // this.previews.push(e.target.result);
        this.previews[position] = e.target.result
      };
      reader.readAsDataURL(this.selectedFiles[0]);
      this.selectedFileNames[position] = this.selectedFiles[0].name
    }

  }
}
