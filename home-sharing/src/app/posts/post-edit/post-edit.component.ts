import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {PostEditService} from "./post-edit.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Observable, of, Subject} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {map, startWith, tap} from "rxjs/operators";
import {District, Province, ResponseDistrict, ResponseProvince} from "../../shared/model/district.model";
import {$e} from "@angular/compiler/src/chars";

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
  @ViewChild('vouchersInput') voucherInput: ElementRef<HTMLInputElement>;
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
  isVoucherPost = true

  //address
  districts:District[] = []
  provinces:Province[] = []
  // imgPositionChanged = new Subject<FileList>()
  imgPreviewPositionChanged = new Subject<string[]>()

  constructor(private fb: FormBuilder, private postEditService: PostEditService) {

  }

  get ServicesPost(): FormArray {
    return this.formGroupPost.get('servicePost') as FormArray
  }
  get VoucherPost(): FormArray {
    return this.formGroupPost.get('voucherPost') as FormArray
  }

  ngOnInit(): void {
    this.initForm();
    this.getAllDistrict()
    this.getAllProvince()
    // this.filteredVouchers = this.formGroupPost.controls['vouchersCtrl'].valueChanges.pipe(
    //   startWith(null),
    //   map((voucher: string | null) => (voucher ? this._filter(voucher) : this.allVouchers.slice())),
    // );
   // this.filteredVouchers = of(this.formGroupPost.controls['vouchersCtrl'].value).pipe(
   //    map(voucher => voucher ? this._filter(voucher) : this.allVouchers.slice())
   //  );
   //  this.imageInfos = this.postEditService.getFiles();
   //  this.formGroupPost.get('district').valueChanges.subscribe(v=>{
   //      console.log(v)
   //    let a = this.districts.filter(district =>{
   //      district.name === "Quận Hoàn kiếm"
   //    })
   //    console.log(a)
   //  })
  }

  initForm() {
    this.formGroupPost = this.fb.group({
      name: [''],
      address: [''],
      district:[''],
      province:[''],
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
      voucherPost:this.fb.array([
        // this.fb.group({
        //   voucherName:[''],
        //   pctDiscout:['']
        // })
      ])
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

  //LOAD ADDRESS
  getAllDistrict(){
    let districtObj:ResponseDistrict
    this.postEditService.getDistricts().subscribe(responseDistrict =>{
      districtObj = responseDistrict as ResponseDistrict
      // console.log(districtObj)
      this.districts = districtObj.object
      // console.log(districtObj.object)
    })
  }

  getAllProvince(){
    let provinceObj: ResponseProvince
    this.postEditService.getProvince().subscribe(responseProvince =>{
      provinceObj = responseProvince as ResponseProvince
      this.provinces = provinceObj.object
      // console.log(this.provinces)
    })
  }

  onSelectedProvince($event) {

  }

  onSelectedDistrict($event) {
      console.log($event)
    let districtName = $event.value
  }
  //Voucher
  onDeleteVoucher(i: number) {
    if (this.VoucherPost.length <= 1) {
      this.isVoucherPost = false
      return
    }
    this.VoucherPost.removeAt(i)
  }

  onAddVoucher() {
    this.VoucherPost.push(this.fb.group({
      voucherName: [''],
      pctDiscout: ['']
    }))
    this.isVoucherPost = true
  }



  // vouchers = ['Voucher 1','Voucher 2']
  // allVouchers = ['Voucher 1','Voucher 2','Voucher 3','Voucher 4','Voucher 5']
  // filteredVouchers: Observable<string[]>;
  // separatorKeysCodes: number[] = [ENTER, COMMA];
  // addVoucher(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim();
  //
  //   // Add our fruit
  //   if (value) {
  //     if(!this.vouchers.includes(value.trim())) {
  //       this.vouchers.push(value);
  //       this.allVouchers.filter(v =>v!== value)
  //     }
  //   }
  //
  //   // Clear the input value
  //   event.chipInput!.clear();
  //
  //   this.formGroupPost.controls['vouchersCtrl'].setValue(null);
  // }
  //
  // removeVoucher(fruit: string): void {
  //   const index = this.vouchers.indexOf(fruit);
  //
  //   if (index >= 0) {
  //     this.vouchers.splice(index, 1);
  //   }
  // }
  //
  // selected(event: MatAutocompleteSelectedEvent): void {
  //   this.vouchers.push(event.option.viewValue);
  //   this.voucherInput.nativeElement.value = '';
  //   this.formGroupPost.controls['vouchersCtrl'].setValue(null);
  // }
  //
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.allVouchers.filter(voucher => voucher.toLowerCase().includes(filterValue));
  // }



}
