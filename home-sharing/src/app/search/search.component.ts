import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PostEditService} from "../posts/post-edit/post-edit.service";
import {ServiceObj} from "../shared/model/serivce-post.model";
import {RoomType} from "../shared/model/room-type.model";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {DatePipe} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "./search.service";
import {SearchListByTitle} from "../shared/model/search-title.model";

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

  savedService = []
  savedDiscout = [0,0]
  savedRoomType= []
  savedRate = []

  title
  pageIndex = 1
  totalPage = 1


  guestNumber = ''
  datePicker = ''
  selected: Date | null;
  formFilterData: FormGroup
  serviceFormArr:FormArray
  groupRate:FormGroup
  groupRoomType:FormGroup
  groupDiscout:FormGroup
  listService: ServiceObj[]=[]
  listRoomType: RoomType[]=[]

  listSearchByTitle:SearchListByTitle[]=[]

  constructor(private route:ActivatedRoute,private datePipe:DatePipe,private _formBuilder: FormBuilder, private postEditService: PostEditService,
              private searchService:SearchService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      console.log('title: '+params['title'])
      this.title = params['title']
      if(this.title){
        this.searchService.searchMoreByTitle(this.title,this.pageIndex).subscribe(response=>{
          this.totalPage=response.data.sizePage
          this.listSearchByTitle = response.data.searchList
          this.totalPage=response.data.sizePage
        })
      }
    })
    this.formFilterData = this._formBuilder.group({
      optionPriceCtrl: [''],
      dateCtrl: [''],
      guestNumberCtrl: [''],
      minPriceCtrl: [''],
      maxPriceCtrl:[''],
      discoutPctCtrl:[''],
      roomTypeCtrl:[''],
      rateCtrl:[''],
      serviceCtrl:[''],
      serviceChoose:this._formBuilder.array([])
      // serviceFormArr:this._formBuilder.array([]),
      // groupRoomType:this._formBuilder.array([]),
      // groupDiscout:this._formBuilder.array([])
    })
    this.initDataFilter()
  }
  onCheckChangeService($event,serviceID:number) {
    console.log($event)

    if($event.checked){
      if(this.savedService.indexOf(serviceID)==-1)
        this.savedService.push(serviceID)
    }
    else{

      let indexRemove =this.savedService.indexOf(serviceID)
      this.savedService.splice(indexRemove,1)
    }
    console.log('service choose: '+this.savedService)
  }

  onCheckChangeRoomType($event,roomTypeID:number) {
    // console.log($event)

    if($event.checked){
      if(this.savedService.indexOf(roomTypeID)==-1)
        this.savedRoomType.push(roomTypeID)
    }
    else{
      let indexRemove =this.savedRoomType.indexOf(roomTypeID)
      this.savedRoomType.splice(indexRemove,1).slice()
    }
    console.log('roomType choose: '+this.savedRoomType)
  }

  onCheckChangeVoucher($event,min:number,max:number) {
    console.log($event)

    if($event.checked){
      if(this.savedDiscout[0]>=min) this.savedDiscout[0] = min
      if(this.savedDiscout[0]<=max) this.savedDiscout[0] = max
    }
    else{
    }
    console.log('roomType choose: '+this.savedService)
  }
  onCheckChangeRate($event,valueRate:number){
    if($event.checked) {
      if(this.savedRate.indexOf(valueRate)==-1)
        this.savedRate.push(valueRate)
    }else {
      let indexRemove = this.savedRate.indexOf(valueRate)
      this.savedRate.splice(indexRemove,1).slice()
    }
    console.log('value rate: '+this.savedRate)
  }
  onFilterData() {
    let minPrice = this.formFilterData.controls.minPriceCtrl.value
    let maxPriceCtrl = this.formFilterData.controls.maxPriceCtrl.value
    let optionPriceCtrl = this.formFilterData.controls.optionPriceCtrl.value
    let dateCtrl = this.formFilterData.controls.dateCtrl.value
    let guestNumberCtrl = this.formFilterData.controls.guestNumberCtrl.value
    // let discoutPctCtrl = this.formFilterData.controls.discoutPctCtrl.value
    // let roomTypeCtrl = this.formFilterData.controls.roomTypeCtrl.value
    // let rateCtrl = this.formFilterData.controls.rateCtrl.value
    // let groupService = this.formFilterData.controls.discoutPctCtrl.value
    console.log('------------------------------------')
    console.log(minPrice)
    console.log(maxPriceCtrl)
    console.log(optionPriceCtrl)
    console.log(this.datePipe.transform(dateCtrl,'yyyy-dd-MM'))
    console.log(guestNumberCtrl)
    // console.log(discoutPctCtrl)
    // console.log(roomTypeCtrl)
    // console.log(rateCtrl)
    // console.log(groupService)

    console.log('------------------------------------')

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
}


