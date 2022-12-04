import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {PostEditService} from "../posts/post-edit/post-edit.service";
import {ServiceObj} from "../shared/model/serivce-post.model";
import {RoomType} from "../shared/model/room-type.model";
import {DatePipe} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "./search.service";
import {SearchListByTitle} from "../shared/model/search-title.model";
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {Province} from "../shared/model/district.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ProvincePickerComponent} from "../shared/dialog/province-picker/province-picker.component";

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

  savedService = []
  savedRoomType = []
  savedRate = []
  isDiscout = 0
  savedProvinceID = 0

  title
  pageIndex = 1
  totalPage = 1

  todayDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  guestNumber = ''
  datePicker = ''
  selected: Date | null;
  formFilterData: FormGroup
  listService: ServiceObj[] = []
  listRoomType: RoomType[] = []
  listProvince:Province[]=[]
  listSearchByTitle: SearchListByTitle[] = []

  provinceDialogRef:MatDialogRef<ProvincePickerComponent>
  constructor(private route: ActivatedRoute, private datePipe: DatePipe, private _formBuilder: FormBuilder, private postEditService: PostEditService,
              private searchService: SearchService,private dialog:MatDialog) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log('title: ' + params['title'])
      this.title = params['title']
      if (this.title) {
        this.searchService.searchMoreByTitle(this.title, this.pageIndex).subscribe(response => {
          this.totalPage = response.data.sizePage
          this.listSearchByTitle = response.data.searchList
          this.totalPage = response.data.sizePage
        })
      }
    })
    this.formFilterData = this._formBuilder.group({
      optionPriceCtrl: [''],
      dateCtrl: [''],
      guestNumberCtrl: [''],
      minPriceCtrl: [''],
      maxPriceCtrl: [''],
      discoutPctCtrl: [''],
      roomTypeCtrl: [''],
      provinceCtrl:[''],
      rateCtrl: [''],
      serviceCtrl: [''],
      serviceChoose: this._formBuilder.array([])
    })
    this.initDataFilter()
    this.initProvince()
  }

  onSelectProvince() {
    this.provinceDialogRef = this.dialog.open(ProvincePickerComponent,{
      data:this.listProvince,
      hasBackdrop:true,
      width:'800px'
    })
    this.provinceDialogRef.afterClosed().subscribe((response:{provinceID,provinceName})=>{
      this.savedProvinceID = response.provinceID
      console.log(this.savedProvinceID)
      this.formFilterData.controls.provinceCtrl.patchValue(response.provinceName)
    })
  }

  onCheckChangeService($event, serviceID: number) {
    console.log($event)

    if ($event.checked) {
      if (this.savedService.indexOf(serviceID) == -1)
        this.savedService.push(serviceID)
    } else {

      let indexRemove = this.savedService.indexOf(serviceID)
      this.savedService.splice(indexRemove, 1)
    }
    console.log('service choose: ' + this.savedService)
  }

  onCheckChangeRoomType($event, roomTypeID: number) {
    // console.log($event)

    if ($event.checked) {
      if (this.savedService.indexOf(roomTypeID) == -1)
        this.savedRoomType.push(roomTypeID)
    } else {
      let indexRemove = this.savedRoomType.indexOf(roomTypeID)
      this.savedRoomType.splice(indexRemove, 1).slice()
    }
    console.log('roomType choose: ' + this.savedRoomType)
  }

  onCheckChangeVoucher($event) {
    console.log($event)
    $event.checked?this.isDiscout = 1:this.isDiscout=0;
    console.log('Is discout: ' + this.isDiscout)
  }

  onCheckChangeRate($event, valueRate: number) {
    if ($event.checked) {
      if (this.savedRate.indexOf(valueRate) == -1)
        this.savedRate.push(valueRate)
    } else {
      let indexRemove = this.savedRate.indexOf(valueRate)
      this.savedRate.splice(indexRemove, 1).slice()
    }
    console.log('value rate: ' + this.savedRate)
  }

  onFilterData() {
    let minPrice = this.formFilterData.controls.minPriceCtrl.value
    let maxPriceCtrl = this.formFilterData.controls.maxPriceCtrl.value
    let optionPriceCtrl = this.formFilterData.controls.optionPriceCtrl.value
    let dateCtrl = this.formFilterData.controls.dateCtrl.value
    let guestNumberCtrl = this.formFilterData.controls.guestNumberCtrl.value
    let roomTypeCtrl = this.formFilterData.controls.roomTypeCtrl.value
    let rateCtrl = this.formFilterData.controls.rateCtrl.value

    let statusSortPrice = 1
    let provinceId = 0

    if(!minPrice) minPrice = 0
    if(!maxPriceCtrl) maxPriceCtrl = 0
    if(!optionPriceCtrl) optionPriceCtrl = 0
    if(!dateCtrl) dateCtrl = null
    if(!guestNumberCtrl) guestNumberCtrl = 0
    if(!roomTypeCtrl) roomTypeCtrl = 0
    if(!rateCtrl) rateCtrl = 0
    if(!this.savedService) this.savedService=[]
    let startDate = this.datePipe.transform(dateCtrl, 'yyyy-MM-dd')
    // console.log('------------------------------------')
    // console.log('minPrice: '+minPrice)
    // console.log('maxPriceCtrl: '+maxPriceCtrl)
    // console.log('optionPriceCtrl: '+optionPriceCtrl)
    // console.log('date: '+this.datePipe.transform(dateCtrl, 'yyyy-MM-dd'))
    // console.log('guestNumberCtrl: '+guestNumberCtrl)
    // console.log(discoutPctCtrl)
    // console.log('roomTypeCtrl: '+roomTypeCtrl)
    // console.log('rateCtrl: '+rateCtrl)
    // console.log('groupService: '+this.savedService)
    //
    // console.log('------------------------------------')



    this.searchService.searchByFilter(this.isDiscout,this.savedService,roomTypeCtrl,startDate,minPrice,maxPriceCtrl,rateCtrl,statusSortPrice,guestNumberCtrl,this.savedProvinceID,this.pageIndex).pipe(catchError(this.handleError)).subscribe(response=>{
      this.totalPage = response.data.sizePage
      this.listSearchByTitle = response.data.searchList.slice()
    },()=>{
      console.log('No data')
      this.listSearchByTitle = []
      }
    )


  }

  initDataFilter() {
    this.postEditService.getService().subscribe(response => {
      this.listService = response.object
    })
    this.postEditService.getRoomType().subscribe(response => {
      let roomData = response.data
      this.listRoomType = roomData.roomTypes
    })
  }

  initProvince(){
    this.searchService.getProvince().subscribe(response=>{
      this.listProvince = response.object
    })
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $(".dropdown_customer").click(function () {
        // $(this).find(".dropdown_content_customer").slideToggle("fast");
        $(".dropdown_content_customer").css("display", "block");
      });
    });

    $(document).on("click", function (event) {
      var $trigger = $(".dropdown_customer");
      var $showDrop = $(".dropdown_content_customer");

      if ($showDrop === event.target && $showDrop.has(event.target).length) {
        $(".dropdown_content_customer").css("display", "block");
      } else if ($trigger === event.target && $trigger.has(event.target).length) {
        $(".dropdown_content_customer").css("display", "block");
      } else if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $(".dropdown_content_customer").css("display", "none");
      }
    });

    $(document).ready(function () {
      $(".dropdown_date").click(function () {
        // $(this).find(".dropdown_content_customer").slideToggle("fast");
        $(".dropdown_content_date").css("display", "block");
      });
    });

    $(document).on("click", function (event) {
      var $trigger = $(".dropdown_date");
      var $showDrop = $(".dropdown_content_date");

      if ($showDrop === event.target && $showDrop.has(event.target).length) {
        $(".dropdown_content_date").css("display", "block");
      } else if ($trigger === event.target && $trigger.has(event.target).length) {
        $(".dropdown_content_date").css("display", "block");
      } else if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $(".dropdown_content_date").css("display", "none");
      }
    });
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!'
    if (!errorResponse.error || !errorResponse.error.status) {
      return throwError(() => new Error(errorMessage))
    }
    switch (errorResponse.error.status) {
      case 'NOT_FOUND':
        errorMessage = 'Không có dữ liệu'
        break;
    }
    console.log(errorMessage)
    return throwError(() => new Error(errorMessage))
  }


  resetProvince() {
    this.formFilterData.controls.provinceCtrl.patchValue('')
    this.savedProvinceID = 0
  }
}


