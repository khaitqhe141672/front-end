import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {PostEditService} from "./post-edit.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {debounceTime, map, shareReplay, startWith} from "rxjs/operators";
import {Province, ResponseDistrict, ResponseProvince} from "../../shared/model/district.model";
import {RoomType} from "../../shared/model/room-type.model";
import {DistrictByProvince} from "./district.model";
import {UtilitiesData, UtilitiesResponse} from "../../shared/model/utility.model";

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
  // typeHomeStay = [
  //   'Chung cư', 'Bungalow', 'Phòng lẻ', 'Biệt thự sân vườn', 'Nhà phố', 'Nhà sàn truyền thống',
  //   'Nhà thôn dã', 'Nhà cabin', 'Căn hộ cao cấp'
  // ]
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
  districts: DistrictByProvince[] = []
  provinces: Province[] = []
  roomTypes: RoomType[] = []
  // imgPositionChanged = new Subject<FileList>()
  imgPreviewPositionChanged = new Subject<string[]>()

  //post attribute
  provinceID: number
  districtID: number
  typeHsID: number
  //Ultility
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredUtility: Observable<UtilitiesData[]>;
  utilitys: string[] = [];
  utilitiesDisplay: UtilitiesData[]
  allUtilitys: UtilitiesData[] = [];
  saveUtilities:UtilitiesData[]=[]
  @ViewChild('utilityInput') utilityInput: ElementRef<HTMLInputElement>;
  // @ViewChild('utilityInput') utilityInput: ElementRef<HTMLInputElement>;
  loadUtility$ = this.postEditService.getUtility().pipe(shareReplay())
  utilityResponse: UtilitiesResponse
  arrUtility: UtilitiesData[]

  constructor(private fb: FormBuilder, private postEditService: PostEditService) {

  }

  get ServicesPost(): FormArray {
    return this.formGroupPost.get('servicePost') as FormArray
  }


  // selectedFiles?: FileList;
  // selectedFileNames: string[] = [];
  // progressInfos: any[] = [];
  // message: string[] = [];
  // previews: string[] = [];
  // imageInfos?: Observable<any>;
  // isServicePost = true

  get VoucherPost(): FormArray {
    return this.formGroupPost.get('voucherPost') as FormArray
  }

  ngOnInit(): void {
    this.initForm();
    // this.getAllDistrict()
    this.getAllProvince()
    this.getAllRoomTypes()
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
    this.getUtility()
    // this.filterUtility()

  }

  initForm() {
    this.formGroupPost = this.fb.group({
      name: [''],
      address: [''],
      district: [''],
      province: [''],
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
      utilitys: [''],
      image: [''],
      voucherPost: this.fb.array([
        // this.fb.group({
        //   voucherName:[''],
        //   pctDiscout:['']
        // })
      ])
    })
  }

  onSubmit() {
    console.log('clicked')
    let postName = this.formGroupPost.controls['name'].value
    let address = this.formGroupPost.controls['address'].value
    // let district = this.formGroupPost.controls['district'].value
    let province = this.formGroupPost.controls['province'].value
    let type = this.formGroupPost.controls['type'].value
    let description = this.formGroupPost.controls['description'].value
    let priceHS = this.formGroupPost.controls['priceHS'].value
    let servicePost: { serviceName: string, servicePrice: string }[] = this.formGroupPost.controls['servicePost'].value
    let image = this.formGroupPost.controls['image'].value
    let voucher: { pctDiscout: number, voucherName: string }[] = this.formGroupPost.controls['voucherPost'].value

    console.log('post name: ' + postName)
    console.log('address: ' + address)
    console.log('district: ' + this.districtID)
    console.log('province: ' + this.provinceID)
    console.log('type: ' + this.typeHsID)
    console.log('description: ' + description)
    console.log('priceHS: ' + priceHS)

    console.log('service post: ' + JSON.stringify(servicePost))
    console.log('image: ' + image)
    console.log('voucher: ' + JSON.stringify(voucher))
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
          // console.log(e.target.result);
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
        // console.log(e.target.result);
        // this.previews.push(e.target.result);
        this.previews[position] = e.target.result
      };
      reader.readAsDataURL(this.selectedFiles[0]);
      this.selectedFileNames[position] = this.selectedFiles[0].name
    }

  }

  //LOAD ADDRESS
  getAllDistrict() {
    let districtObj: ResponseDistrict
    this.postEditService.getDistricts().subscribe(responseDistrict => {
      districtObj = responseDistrict as ResponseDistrict
      this.districts = districtObj.object
    })
  }

  getAllProvince() {
    let provinceObj: ResponseProvince
    this.postEditService.getProvince().subscribe(responseProvince => {
      provinceObj = responseProvince as ResponseProvince
      this.provinces = provinceObj.object
    })
  }

  onSelectedProvince($event) {
    let province: { id: number, name: string } = $event.value
    console.log(province.id)
    // console.log('district value: '+$event.value)
    this.getDistrictByProvinceID(province.id)
    this.provinceID = province.id
  }

  onSelectedDistrict($event) {
    console.log($event.value)
    this.districtID = $event.value
  }

  //Room type
  getAllRoomTypes() {
    this.postEditService.getRoomType().subscribe(response => {
      this.roomTypes = response.data.roomTypes
    })
  }

  getDistrictByProvinceID(provinceID: number) {
    this.postEditService.getDistrictsByProvinceID(provinceID).subscribe(responseDistrict => {
      this.districts = responseDistrict.object
    })
  }

  //UTILITY
  // separatorKeysCodes: number[] = [ENTER, COMMA];
  // filteredUtility: Observable<string[]>;
  // utilitys: string[] = ['Nhà hàng'];
  // allUtilitys: string[] = ['Giặt nà', 'ATM', 'Hồ bơ', 'Công viên', 'Siêu thị'];

  onSelectedTypeHS($event) {
    this.typeHsID = $event.value
  }

  //Voucher
  // getOptionText: any;
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

  filterUtility() {
    // this.postEditService.getUtility().pipe(shareReplay()).subscribe(responseUtility => {
    //   this.utilityResponse = responseUtility
    //   this.arrUtility = this.utilityResponse.data.utilities
    //   this.allUtilitys = this.arrUtility.map(utility => utility.name)
    //
    // })
    this.filteredUtility =
      this.formGroupPost.controls['utilitys'].valueChanges.pipe(
        startWith(null),
        debounceTime(500),
        map((utility: string | null) => {
            // console.log('this is filter: ' + JSON.stringify(this.allUtilitys))
            // console.log('filter utilityID: ' + utility)
            if (utility) return this._filter(utility)
            else return this.allUtilitys.slice()
            //   return (utility ? this._filter(utility) : this.allUtilitys.slice())
          }
        ),
      )

    // this.filteredUtility = this.formGroupPost.get('utilitys').valueChanges.pipe(
    //   startWith(''),
    //   switchMap((inputData) =>{
    //      return this.loadUtility$.pipe(
    //       map((response) => {
    //         return response.data.utilities.map(utility=>utility.name).filter((utility) =>
    //           utility.toLowerCase().includes(inputData?.toLowerCase())
    //         );
    //       })
    //     )}
    //   )
    // );
    // this.filteredUtility = this.formGroupPost
    //   .get('utilitys')
    //   .valueChanges.pipe(
    //     startWith(''),
    //     switchMap((term) => {
    //       return this.loadUtility$.pipe(
    //         map((response) => {
    //           return response.data.utilities.filter((utility) =>
    //             utility.name.toLowerCase().includes(term.toLowerCase())
    //           );
    //         })
    //       );
    //     })
    //   )
  }

  addUtilitys(event): void {
    const value = (event.value || '').trim();

    // Add our utility
    if (value) {
      this.utilitys.push(value);
      // this.utilitysID.push(+value)
    }

    // Clear the input value
    event.chipInput!.clear();
    console.log('add ' + value)
    this.formGroupPost.controls['utilitys'].setValue(null);
  }

  removeUtilitys(utility: UtilitiesData): void {
    const index = this.utilitys.indexOf(utility.name);
    const index2 = this.saveUtilities.indexOf(utility)
    if (index >= 0) {
      this.utilitys.splice(index, 1);
      this.saveUtilities.splice(index2,1)
    }
    console.log('size save utility: '+this.saveUtilities.length)
    console.log('remove utility '+JSON.stringify(this.saveUtilities))
  }

  selectedUtility(event: MatAutocompleteSelectedEvent): void {
    // console.log('selected: ' + event.option.viewValue)
    // console.log('selected2: '+JSON.stringify(event.option.value))
    // if(this.saveUtilities.indexOf(event.option.value as UtilitiesData)!==-1) return
    this.utilitys.push(event.option.viewValue);
    this.saveUtilities.push(event.option.value)
    this.utilityInput.nativeElement.value = '';
    this.utilityInput.nativeElement.blur();
    this.formGroupPost.controls['utilitys'].setValue(null);
    console.log('selected utility '+JSON.stringify(this.saveUtilities))

  }

  getUtility() {

    this.postEditService.getUtility().subscribe(responseUtility => {
      this.utilityResponse = responseUtility
      this.arrUtility = this.utilityResponse.data.utilities
      this.allUtilitys = this.arrUtility
      // console.log(this.allUtilitys)
      this.filterUtility()
    })

  }

  displayUtility(utility: UtilitiesData) {
    return utility ? utility.name : ''
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

  toLowerCaseNonAccentVietnamese(str) {
    str = str.toLowerCase();
    str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a");
    str = str.replace(/[èéẹẻẽêềếệểễ]/g, "e");
    str = str.replace(/[ìíịỉĩ]/g, "i");
    str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o");
    str = str.replace(/[ùúụủũưừứựửữ]/g, "u");
    str = str.replace(/[ỳýỵỷỹ]/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/[\u0300\u0301\u0303\u0309\u0323]/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/[\u02C6\u0306\u031B]/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  }

  private _filter(value: any): UtilitiesData[] {
    const filterValue = value.name || value;
    return this.allUtilitys.filter(utility => this.toLowerCaseNonAccentVietnamese(utility.name).includes(this.toLowerCaseNonAccentVietnamese(filterValue.toLowerCase())));
  }
  checkUtilityExist(utility?:UtilitiesData):boolean{
    return !this.saveUtilities.find(data => data.id = utility.id);
  }
}
