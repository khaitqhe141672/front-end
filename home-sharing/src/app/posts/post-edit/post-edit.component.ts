import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {PostEditService} from "./post-edit.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Observable, Subject, Subscription} from "rxjs";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {debounceTime, map, shareReplay, startWith} from "rxjs/operators";
import {Province, ResponseDistrict, ResponseProvince} from "../../shared/model/district.model";
import {RoomType} from "../../shared/model/room-type.model";
import {DistrictByProvince} from "./district.model";
import {UtilitiesData, UtilitiesResponse} from "../../shared/model/utility.model";
import {MapService} from "../../map/map.service";
import {Post} from "../post.model";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {Voucher, VoucherResponse} from "../../shared/model/voucher.model";
import {MatSelect} from "@angular/material/select";
import {ServiceObj} from "../../shared/model/serivce-post.model";
import {AuthInterceptorService} from "../../auth/auth-interceptor.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PostDetailService} from "../post-detail/post-detail.service";
import {PostDetail} from "../post-detail/post-detail.model";

export interface ResponsePost {
  message: string
  data: IdResponse
}

export interface IdResponse {
  Message: string
  postID: number
}


declare var $: any;

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
  providers: [
    AuthInterceptorService,
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true}
    },
  ]
})
export class PostEditComponent implements OnInit, AfterViewInit, OnDestroy {

  //handle input error
  matcherInput

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
  previews: string[] = new Array<string>(5);
  // arr = new Array<number>(3);
  imageInfos?: Observable<any>;
  savedFiles: File[] = []
  //service:
  dropDownServiceData = []
  saveService: { serviceID: number; price: number }[] = []
  dropDOwnSettingService: IDropdownSettings = {};
  loadedService: ServiceObj[]
  filteredServices: Observable<ServiceObj[]>
  isServicePost = true
  isVoucherPost = true
  address: string = null
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
  saveUtilities: UtilitiesData[] = []
  //Voucher
  loadedVoucher
  filteredVoucher: Observable<Voucher[]>;
  vouchers: string[] = [];
  vouchersDisplay: Voucher[]
  allVoucher: Voucher[] = [];
  saveVouchers: Voucher[] = []
  voucherResponse: VoucherResponse
  @ViewChild('multiSelectVoucher', {static: true}) multiSelectVoucher: MatSelect
  @ViewChild('utilityInput') utilityInput: ElementRef<HTMLInputElement>;
  @ViewChild('voucherInput') voucherInput: ElementRef<HTMLInputElement>;
  @ViewChild('serviceInput') serviceInput: ElementRef<HTMLInputElement>;
  // @ViewChild('utilityInput') utilityInput: ElementRef<HTMLInputElement>;
  loadUtility$ = this.postEditService.getUtility().pipe(shareReplay())
  utilityResponse: UtilitiesResponse
  arrUtility: UtilitiesData[]
  //process
  isUploading = false
  //Edit Mode
  isEditMode = false
  postID: number
  postDetail: PostDetail = new PostDetail()
  fileListAsArray
  process = 0
  protected _onDestroy = new Subject()


  // selectedFiles?: FileList;
  // selectedFileNames: string[] = [];
  // progressInfos: any[] = [];
  // message: string[] = [];
  // previews: string[] = [];
  // imageInfos?: Observable<any>;
  // isServicePost = true
  //address
  private isChangeAddress!: Subscription

  constructor(private fb: FormBuilder, private postEditService: PostEditService, private mapService: MapService, private route: ActivatedRoute, private postDetailService: PostDetailService,private router:Router) {

  }

  get ServicesPost(): FormArray {
    return this.formGroupPost.get('servicePost') as FormArray
  }

  get VoucherPost(): FormArray {
    return this.formGroupPost.get('voucherPost') as FormArray
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.postID = +params['id']
      this.isEditMode = params['id'] != null
      console.log('edit mode: ' + this.isEditMode)
    })
    this.initForm();
    // this.getAllDistrict()
    // this.getAllProvince()
    this.getAllRoomTypes()
    // this.initMap()
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
    this.isChangeAddress = this.mapService.addressChanged.subscribe(address => {
      this.address = address
      const matcher = this.address.match('Hanoi\\s?([0-9]*)')
      if (matcher) {
        console.log("this is: " + matcher[0])
        console.log(this.address.replace(/Hanoi[\\s]?([0-9]*)?/g, 'Hà Nội'))
      } else {
        console.log("no no")
      }
      console.log('this is address post edit: ' + this.address)
    })
    // this.loadVoucher()
    // this.filterUtility()

    this.getVoucher()
    this.getService()
    if(this.isEditMode){
      this.initDataEditMode()
    }
    // this.matcherInput = FormErrorStateMatcher
  }

  initForm() {
    this.formGroupPost = this.fb.group({
      name: ['', Validators.compose([
        Validators.required,
      ])],
      address: [''],
      // district: [''],
      // province: [''],
      type: [-1],
      description: ['', Validators.required],
      priceHS: ['', Validators.required],
      vouchers: [''],
      selectServiceCtrl: [''],
      servicePost: this.fb.array(
        [
          this.fb.group({
            serviceID: [''],
            serviceName: ['', Validators.required],
            servicePrice: ['', Validators.required]
          })
        ]
      ),
      guestNumber: ['', Validators.required],
      numbersOfBed: ['', Validators.required],
      numbersOfRoom: ['', Validators.required],
      numbersOfBath: ['', Validators.required],
      utilitys: [''],
      image: [''],
      inputImg: [''],
      voucherPost: this.fb.array([
        // this.fb.group({
        //   voucherName:[''],
        //   pctDiscout:['']
        // })
      ])
    })
  }

  bindDataToForm(){
    this.formGroupPost.controls.name.patchValue(this.postDetail.title)
    this.formGroupPost.controls.type.patchValue(this.findRoomTypeIdByName().id)
    this.formGroupPost.controls.priceHS.patchValue(this.postDetail.price)
    this.formGroupPost.controls.numbersOfBed.patchValue(this.postDetail.numberOfBeds)
    this.formGroupPost.controls.numbersOfRoom.patchValue(this.postDetail.numberOfBedrooms)
    this.formGroupPost.controls.numbersOfBath.patchValue(this.postDetail.numberOfBathrooms)
    this.formGroupPost.controls.guestNumber.patchValue(this.postDetail.guestNumber)
    this.formGroupPost.controls.description.patchValue(this.postDetail.description)

  }
  findRoomTypeIdByName(){
    return this.roomTypes.find(c => {
      if (c.name == this.postDetail.roomTypeName)
        return c.id
      else return ''
    })
  }
  // selected:number = 1
  initDataEditMode() {
    this.postDetailService.getPostDetail(this.postID).subscribe(responseData => {
      this.postDetail = responseData.object as PostDetail
      console.log('type hs : ' + this.postDetail.roomTypeName)
      this.bindDataToForm()
      //load room type
      // let selectedvalue = this.roomTypes.find(c => {
      //   if (c.name == this.postDetail.roomTypeName)
      //     return c.id
      //   else return ''
      // })
      // this.formGroupPost.controls.type.patchValue(selectedvalue.id)
      let utilitiesDataPostLoaded = this.postDetail.postUtilityDtoList
      for (let utility of utilitiesDataPostLoaded){
        const utilityConverter: UtilitiesData = {
          id: utility.postUtilityID,
          name: utility.nameUtility,
          icon: utility.iconUtility
        }
        this.utilitys.push(this.displayUtility(utilityConverter))
        this.onAddUtilityData(utilityConverter)
      }


      //load service edit mode
      const services = this.postDetail.serviceDtoList
      for (let service of services) {
        const serviceConverter = {id: service.serviceID, icon: service.iconService,name:service.nameService,price:service.price} as ServiceObj
        this.onAddServiceData(serviceConverter)
      }

      const listVoucherPostLoaded = this.postDetail.postVoucherDtoList
      for(let voucher of listVoucherPostLoaded){
        const voucherConverted:Voucher = {
          idVoucher:voucher.voucherID,
          nameVoucher:voucher.code,
          description:voucher.description,
          percent:voucher.percent,
          dueDate:voucher.dueDay,
          status:voucher.status
        }
        this.vouchers.push(this.displayVoucher(voucherConverted))
        this.onAddVoucherData(voucherConverted)
      }
      console.log('raw list voucher: '+JSON.stringify(this.postDetail.postVoucherDtoList))
      console.log('list voucher: '+JSON.stringify(this.saveVouchers))

      //Load Img
      this.previews = []
      let number = 1
        this.postEditService.getImgFile(this.postDetail.postID).subscribe((imgResponse)=>{

          // if(number == 1){
            // console.log(imgResponse[0])
          //   number =2
          // }
          // let objectURL = 'data:image/jpeg;base64,' + imgResponse;
          for (let imgBase64 of imgResponse){
            const imgConverter = 'data:image/jpeg;base64,' + imgBase64
            this.previews.push(imgConverter)
            const imageBlob = this.dataURItoBlob(imgBase64);
            const imageFile = new File([imageBlob], 'a', { type: 'image/png' });
            // if(number == 1){
            //   console.log(this.previews)
            //   number =2
            // }
            this.savedFiles.push(imageFile)
          }
          console.log(this.savedFiles)

          // this.createImageFromBlob(imgResponse)
        })
    })
  }
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([int8Array], {type: 'image/png'});
  }
  public findInvalidControls() {
    const invalid = [];
    const controls = this.formGroupPost.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  onSubmit() {
    console.log('clicked')
    let postName = this.formGroupPost.controls['name'].value
    let address = this.formGroupPost.controls['address'].value
    // let district = this.formGroupPost.controls['district'].value
    // let province = this.formGroupPost.controls['province'].value
    let typeID = this.formGroupPost.controls['type'].value
    let description = this.formGroupPost.controls['description'].value
    let priceHS = this.formGroupPost.controls['priceHS'].value
    let numbersOfBed = this.formGroupPost.controls['numbersOfBed'].value
    let numbersOfRoom = this.formGroupPost.controls['numbersOfRoom'].value
    let numbersOfBath = this.formGroupPost.controls['numbersOfBath'].value
    let guestNumber = this.formGroupPost.controls['guestNumber'].value

    let servicePost = this.formGroupPost.controls['servicePost'].value as { serviceID: number, serviceName: string, servicePrice: number }[]
    // let servicePost2 = servicePost as {serviceID:number,serviceName:string,servicePrice:number}[]
    this.saveService = servicePost.map(service => {
      return {serviceID: service.serviceID, price: service.servicePrice}
    })

    let saveUtilityIDs: number[] = this.saveUtilities.map(utility => {
      return utility.id
    })

    let saveVoucherID: number[] = this.saveVouchers.map(voucher => {
      return voucher.idVoucher
    })

    let image = this.formGroupPost.controls['image'].value
    let voucher: { pctDiscout: number, voucherName: string }[] = this.formGroupPost.controls['voucherPost'].value
    let lat = this.mapService.markerLat
    let lng = this.mapService.markerLng
    // console.log('---------------------------------------------------')
    // console.log('1.type: ' + typeID)
    // console.log('2.address: ' + this.address)
    // console.log('3.guest: ' + guestNumber)
    // console.log('4.number of Bath: ' + numbersOfBath)
    // console.log('5.number of Room: ' + numbersOfRoom)
    // console.log('6.number of bed: ' + numbersOfBed)
    //
    // console.log('7.title: ' + postName)
    // console.log('8.description: ' + description)
    // console.log('9.priceHS: ' + priceHS)
    // console.log('10.utility: ' + JSON.stringify(saveUtilityIDs))
    // console.log('11.voucher: ' + JSON.stringify(this.saveVouchers))
    // console.log('12.lat: '+lat)
    // console.log('13.lng: '+lng)
    console.log('14.service post: ' + JSON.stringify(this.saveService))
    // // console.log('14.service post: ' +  JSON.stringify(servicePost))
    // console.log('15."paymentPackageID": 1')
    // console.log('---------------------------------------------------')
    let post = new Post()
    if(this.postDetail.postID) post.postID = this.postDetail.postID
    post.guestNumber = guestNumber
    post.numberOfBathrooms = numbersOfBath
    post.numberOfBedrooms = numbersOfRoom
    post.numberOfBeds = numbersOfBed

    post.title = postName
    post.description = description
    post.price = priceHS

    this.typeHsID?post.roomTypeID = this.typeHsID:post.roomTypeID = typeID

    post.address = this.address

    let postIDResponse: number
    console.log('address submit: ' + post.address)
    // this.postEditService.pushPost(typeID,post,lat,lng,saveUtilityIDs,saveVoucherID,this.saveService)
    this.isUploading = true
    let pushPostObservable: Observable<any>
    pushPostObservable = this.postEditService.pushPost(post, lat, lng, saveUtilityIDs, saveVoucherID, this.saveService)
    pushPostObservable.subscribe({
      next: responseData => {
        console.log('res2: ' + JSON.stringify(responseData))
        postIDResponse = responseData.data.postID as number
        this.postID = postIDResponse
      },
      error: errMessageResponse => {
        console.log(errMessageResponse)
      },
      complete: () => {
        console.log('complete')
          this.isEditMode?this.uploadFiles(post.postID):this.uploadFiles(postIDResponse)
      }
    })
  }

  // removeUtilitys(utility: UtilitiesData): void {
  //   const index = this.utilitys.indexOf(utility.name);
  //   const index2 = this.saveUtilities.indexOf(utility)
  //   if (index >= 0) {
  //     this.utilitys.splice(index, 1);
  //     this.saveUtilities.splice(index2,1)
  //   }
  //   console.log('size save utility: '+this.saveUtilities.length)
  //   console.log('remove utility '+JSON.stringify(this.saveUtilities))
  // }

  //Service
  onAddService() {
    console.log('service post length: ' + this.ServicesPost.length)
    this.ServicesPost.push(this.fb.group({
      serviceID: [null],
      serviceName: ['', Validators.required],
      servicePrice: ['', Validators.required]
    }))
    this.isServicePost = true
  }

  onDeleteService(i: number, s) {
    console.log('ondelete service: ' + JSON.stringify(s.value))
    if (this.ServicesPost.length <= 1) {
      this.isServicePost = false
      return
    }
    this.ServicesPost.removeAt(i)
    if (!s.value.serviceID || !s.value.serviceName) return;
    this.loadedService.push({id: s.value.serviceID, icon: 'none', name: s.value.serviceName})
    console.log(JSON.stringify(this.loadedService))
    this.filterService()
    // this.saveService.splice(i,1)
  }

  bindServiceDataToFormGroup(service: ServiceObj) {
    this.ServicesPost.push(this.fb.group({
      serviceID: [service.id],
      serviceName: [service.name, [Validators.required]],
      servicePrice: [service.price, Validators.required]
    }))
    this.isServicePost = true
  }

  getService() {
    this.postEditService.getService().subscribe(responseService => {
      this.loadedService = responseService.object
      this.filterService()
    })
  }

  filterService() {
    this.filteredServices = this.formGroupPost.controls.selectServiceCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        map((service: string | null) => {
          if (service) return this._filterService(service)
          else return this.loadedService.slice()
        })
      )
  }

  displayWithService(service: ServiceObj) {
    return service ? service.name : ''
  }

  onSelectService($event) {
    console.log($event)
    let service = $event.option.value as ServiceObj
    console.log(service)
    // this.saveService.push({serviceID:service.id})
    this.onAddServiceData(service)
    // let formArr = <FormArray>this.formGroupPost.controls['servicePost']
    // let formControl = <FormGroup>formArr.controls[0]
    // let firstFormControlServiceName = formControl.controls['serviceName'].value
    // let firstFormControlServiceID = formControl.controls['serviceID'].value
    // if (firstFormControlServiceName) {
    //   this.bindServiceDataToFormGroup(service)
    // } else {
    //   formControl.controls['serviceName'].patchValue(service.name)
    //   formControl.controls['serviceID'].patchValue(service.id)
    // }
    // this.serviceInput.nativeElement.blur()
    // this.formGroupPost.controls['selectServiceCtrl'].patchValue('')
    // let indexService = this.loadedService.indexOf(service)
    // if (indexService > -1) {
    //   this.loadedService.splice(indexService, 1)
    // }
    // this.formGroupPost.controls.servicePost.patchValue(null)
  }

  onAddServiceData(service: ServiceObj) {
    let formArr = <FormArray>this.formGroupPost.controls['servicePost']
    let formControl = <FormGroup>formArr.controls[0]
    let firstFormControlServiceName = formControl.controls['serviceName'].value
    let firstFormControlServiceID = formControl.controls['serviceID'].value
    if (firstFormControlServiceName) {
      this.bindServiceDataToFormGroup(service)
    } else {
      formControl.controls['serviceName'].patchValue(service.name)
      formControl.controls['serviceID'].patchValue(service.id)
      if(service.price)  formControl.controls['servicePrice'].patchValue(service.price)
    }
    this.serviceInput.nativeElement.blur()
    this.formGroupPost.controls['selectServiceCtrl'].patchValue('')
    // let indexService = this.loadedService.indexOf(service)
    let indexService = this.loadedService.findIndex(serviceFinding=>serviceFinding.id === service.id)
    console.log('index 2: '+indexService)
    if (indexService > -1) {
      this.loadedService.splice(indexService, 1)
    }
    this.formGroupPost.controls.servicePost.patchValue(null)
  }

  //IMG
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;
    this.savedFiles = [].slice()
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.savedFiles.push(this.selectedFiles.item(i))
      // console.log(this.savedFiles[i].name)
    }
    this.previews = [];
    if (this.savedFiles && this.savedFiles[0]) {
      const numberOfFiles = this.savedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          // console.log(e.target.result);
          this.previews[i] = e.target.result;
        };

        reader.readAsDataURL(this.savedFiles[i]);

        this.selectedFileNames.push(this.savedFiles[i].name);
        console.log(this.selectedFileNames[i])
      }
    }

  }

  // upload(idx: number, file: File): void {
  //   this.progressInfos[idx] = {value: 0, isLoading: true, fileName: file.name};
  //   console.log('pushing3')
  //   if (file) {
  //     console.log('pushing 5')
  //     this.postEditService.uploadByAPI(file).subscribe(
  //       (event: any) => {
  //
  //         console.log('event type: ' + JSON.stringify(event))
  //         console.log('pushing4')
  //         if (event.type === HttpEventType.UploadProgress) {
  //           this.progressInfos[idx].value = Math.round(
  //             (100 * event.loaded) / event.total
  //           );
  //           console.log(this.progressInfos[idx].value)
  //         } else if (event instanceof HttpResponse) {
  //           const msg = 'Uploaded the file successfully: ' + file.name;
  //           this.message.push(msg);
  //           // this.imageInfos = this.postEditService.getFiles();
  //         }
  //       },
  //       (err: any) => {
  //         this.progressInfos[idx].value = 0;
  //         const msg = 'Could not upload the file: ' + file.name;
  //         this.message.push(msg);
  //       }, () => {
  //         console.log('complete 1')
  //         this.progressInfos[idx].isLoading = false;
  //         this.process++
  //         if (this.process == 5) {
  //           this.isUploading = false
  //         }
  //       }
  //     );
  //   }
  // }

  uploadFiles(postIdResponse): void {
    this.message = [];
    this.isUploading = true
    let formDataImg = new FormData()
    if (this.savedFiles) {
      for (let i = 0; i < this.savedFiles.length; i++) {
        formDataImg.append('file', this.savedFiles[i])
      }
      this.uploadAll(formDataImg, postIdResponse);
    }
    // if (this.selectedFiles) {
    //   for (let i = 0; i < this.selectedFiles.length; i++) {
    //    this.upload(i,this.selectedFiles[i])
    //   }
    //   this.uploadAll(formDataImg);
    //
    // }
    // this.uploadAllImg()
  }

  uploadAll(formDataImg: FormData, postID: number): void {
    // this.progressInfos[idx] = {value: 0,isLoading:true, fileName: file.name};
    console.log('pushing3')
    if (formDataImg) {
      console.log('pushing 5')
      this.postEditService.uploadAllFileByAPI(this.isEditMode,formDataImg, postID).subscribe(
        (event: any) => {

          console.log('event type: ' + JSON.stringify(event))
          console.log('pushing4')
          if (event.type === HttpEventType.UploadProgress) {
            this.isUploading = true
            // this.progressInfos[idx].value = Math.round(
            //   (100 * event.loaded) / event.total
            // );
            // console.log( this.progressInfos[idx].value)
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: '
            // this.message.push(msg);
            // this.imageInfos = this.postEditService.getFiles();
          }
        },
        (err: any) => {
          // this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ';
          this.message.push(msg);
        }, () => {
          console.log('complete 1')
          // this.progressInfos[idx].isLoading= false;
          this.isUploading = false
          this.router.navigate(['../posts/post-detail/'+this.postID])
        }
      );
    }
  }


  onChangePositionImg(event, pos1: number, pos2: number) {
    // console.log(this.previews[pos1]);
    // console.log(this.previews[pos2]);
    // if (!this.previews[pos2]) return
    //
    // [[this.previews[pos1]], [this.previews[pos2]]] = [[this.previews[pos2]], [this.previews[pos1]]];
    // [[this.selectedFileNames[pos1]], [this.selectedFileNames[pos2]]] = [[this.selectedFileNames[pos2]], [this.selectedFileNames[pos1]]];
    // [[this.selectedFiles[pos1]], [this.selectedFiles[pos2]]] = [[this.selectedFiles[pos2]], [this.selectedFiles[pos1]]];
    //
    // this.imgPreviewPositionChanged.next(this.previews.slice())
    // this.imgPreviewPositionChanged.next(this.selectedFileNames.slice())

    if (!this.previews[pos2]) return
    [[this.previews[pos1]], [this.previews[pos2]]] = [[this.previews[pos2]], [this.previews[pos1]]];
    [[this.selectedFileNames[pos1]], [this.selectedFileNames[pos2]]] = [[this.selectedFileNames[pos2]], [this.selectedFileNames[pos1]]];
    // [[this.selectedFiles[pos1]], [this.selectedFiles[pos2]]] = [[this.selectedFiles[pos2]], [this.selectedFiles[pos1]]];

    [[this.savedFiles[pos1]], [this.savedFiles[pos2]]] = [[this.savedFiles[pos2]], [this.savedFiles[pos1]]];
    this.imgPreviewPositionChanged.next(this.previews.slice())
    this.imgPreviewPositionChanged.next(this.selectedFileNames.slice())

    let list = new DataTransfer();
    for (let i = 0; i < 5; i++) {
      console.log(JSON.stringify(this.savedFiles[i].name))
    }
    console.log('----------------------------------------')

    // [[list[pos1]], [list[pos2]]] = [[list[pos2]], [list[pos1]]];

    // this.selectedFiles = new FileList()

    // console.log(this.previews[pos1]);
    // console.log(this.previews[pos2]);

    // let temp_file = list[pos1]
    // list[pos1] = list[pos2]
    // list[pos2] = temp_file
    // this.selectedFiles = list.files
    // for (let i =0;i<this.selectedFiles.length;i++){
    //   console.log(this.selectedFiles[i].name)
    // }
    // for (let i =0;i<list.files.length;i++){
    //   console.log(list[i])
    // }
  }

  onDeleteImg($event, position: number) {
    // this.imgPreviewPositionChanged.next(this.previews.splice(position, 1)) xoa anh va day arr len
    this.previews[position] = undefined
    this.imgPreviewPositionChanged.next(this.previews.slice())
    this.savedFiles[position] = undefined
    this.selectedFileNames[position] = undefined
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
      this.savedFiles[position] = this.selectedFiles[0]
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
      console.log(this.roomTypes)
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
    console.log('this is type onSelected: ' + this.typeHsID)
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

  filterVoucher() {
    this.filteredVoucher =
      this.formGroupPost.controls['vouchers'].valueChanges.pipe(
        startWith(null),
        debounceTime(500),
        map((voucher: string | null) => {
            if (voucher) return this._filterVoucher(voucher)
            else return this.allVoucher.slice()
          }
        ),
      )
  }

  addVoucher(event): void {
    const value = (event.value || '').trim();

    if (value) {
      this.vouchers.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
    console.log('add ' + value)
    this.formGroupPost.controls['vouchers'].setValue(null);
  }

  removeVouchers(voucher: Voucher): void {
    const index = this.vouchers.indexOf(voucher.nameVoucher);
    const index2 = this.saveVouchers.indexOf(voucher)
    if (index >= 0) {
      this.vouchers.splice(index, 1);
      this.saveVouchers.splice(index2, 1)
    }
    console.log('size save voucher: ' + this.saveVouchers.length)
    console.log('remove voucher ' + JSON.stringify(this.saveVouchers))
  }

  selectedVoucher(event: MatAutocompleteSelectedEvent): void {
    this.vouchers.push(event.option.viewValue);
    this.onAddVoucherData(event.option.value);

  }

  onAddVoucherData(voucher:Voucher){
    this.saveVouchers.push(voucher)
    this.voucherInput.nativeElement.value = '';
    this.voucherInput.nativeElement.blur();
    this.formGroupPost.controls['vouchers'].setValue(null);
    console.log('selected voucher ' + JSON.stringify(this.saveVouchers))
  }

  getVoucher() {

    console.log('get voucher here')
    this.postEditService.getVoucher().subscribe(voucherResponse => {
      console.log('voucher response: '+JSON.stringify(voucherResponse))
      console.log('all voucher: '+JSON.stringify(voucherResponse.object))

      // this.voucherResponse = voucherResponse
      // let dataVoucherResponse = voucherResponse.data
      this.allVoucher = voucherResponse.object
      this.filterVoucher()
    })
  }

  loadVoucher() {
    this.postEditService.getVoucher().subscribe(voucherResponse => {
      let listVoucher: Voucher[] = voucherResponse.object
      this.loadedVoucher = listVoucher
      console.log(this.loadedVoucher)

    })
    this.dropDOwnSettingService = {
      idField: 'idVoucher',
      textField: 'nameVoucher'
    }
  }

  displayVoucher(voucher: Voucher) {
    return voucher ? voucher.nameVoucher : ''
  }

  //--------------------------------------------------------------------------------
  // filterVoucher:ReplaySubject<Voucher[]> = new ReplaySubject<Voucher[]>()
  // voucherMultiFilterCtrl: FormControl = new FormControl();
  // voucherMultiCtrl:FormControl = new FormControl()


  filterUtility() {
    this.filteredUtility =
      this.formGroupPost.controls['utilitys'].valueChanges.pipe(
        startWith(null),
        debounceTime(500),
        map((utility: string | null) => {
            if (utility) return this._filter(utility)
            else return this.allUtilitys.slice()
          }
        ),
      )
  }

  addUtilitys(event): void {
    const value = (event.value || '').trim();

    // Add our utility
    if (value) {
      this.utilitys.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
    this.formGroupPost.controls['utilitys'].setValue(null);
  }

  removeUtilitys(utility: UtilitiesData): void {
    const index = this.utilitys.indexOf(utility.name);
    const index2 = this.saveUtilities.indexOf(utility)
    if (index >= 0) {
      this.utilitys.splice(index, 1);
      this.saveUtilities.splice(index2, 1)
    }
    console.log('size save utility: ' + this.saveUtilities.length)
    console.log('remove utility ' + JSON.stringify(this.saveUtilities))
  }

  selectedUtility(event: MatAutocompleteSelectedEvent): void {
    this.utilitys.push(event.option.viewValue);
   this.onAddUtilityData(event.option.value)

  }

  onAddUtilityData(utility:UtilitiesData){
    this.saveUtilities.push(utility)
    this.utilityInput.nativeElement.value = '';
    this.utilityInput.nativeElement.blur();
    this.formGroupPost.controls['utilitys'].setValue(null);
    console.log('selected utility ' + JSON.stringify(this.saveUtilities))
  }

  getUtility() {
    this.postEditService.getUtility().subscribe(responseUtility => {
      this.utilityResponse = responseUtility
      this.arrUtility = this.utilityResponse.data.utilities
      this.allUtilitys = this.arrUtility
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


    // $(document).ready(function () {
    //   $(document).on('click', '.dropbtn2', function () {
    //     $('.dropbtn2').not(this).next().removeClass('show');
    //     $(this).next().toggleClass('show');
    //   });
    //   $(document).on('click', function (e) {
    //     if (!$(e.target).closest('.dropbtn2').length)
    //       $('.dropbtn2').next().removeClass('show');
    //   });
    // });
    // $('#img4').click(function () {
    //   $('#fileInput2').trigger('click');
    // });
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

  checkUtilityExist(utility?: UtilitiesData): boolean {
    return !this.saveUtilities.find(data => data.id = utility.id);
  }

  ngOnDestroy(): void {
    this.isChangeAddress.unsubscribe()
  }

  private _filter(value: any): UtilitiesData[] {
    const filterValue = value.name || value;
    return this.allUtilitys.filter(utility => this.toLowerCaseNonAccentVietnamese(utility.name).includes(this.toLowerCaseNonAccentVietnamese(filterValue.toLowerCase())));
  }

  private _filterVoucher(value: any): Voucher[] {
    const filterValue = value.name || value;
    return this.allVoucher.filter(voucher => this.toLowerCaseNonAccentVietnamese(voucher.nameVoucher).includes(this.toLowerCaseNonAccentVietnamese(filterValue.toLowerCase())));
  }

  private _filterService(value: any): ServiceObj[] {
    console.log('filter value: ' + JSON.stringify(value))
    const filterValue = value.name || value

    return this.loadedService.filter(voucher => this.toLowerCaseNonAccentVietnamese(voucher.name.toLowerCase()).includes(this.toLowerCaseNonAccentVietnamese(filterValue.toLowerCase())))
  }


}
