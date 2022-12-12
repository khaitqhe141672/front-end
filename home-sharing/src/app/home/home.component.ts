import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {HomeService} from "./home.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecommendedPlace, RecommendedPlaceResponse} from "../shared/model/RecommendedPlace.model";
import {InterestingPlace, InterestingPlaceResponse} from "../shared/model/InterestingPlace.model";
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";
import {PostTopRate, ResponsePostTopRate} from "../shared/model/PostYopRate.model";
import {OwlOptions} from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit, AfterViewInit {

  role = JSON.parse(localStorage.getItem("role"));

  recommendedPlaceResponse: RecommendedPlaceResponse
  interestingPlaceResponse: InterestingPlaceResponse
  responsePostTopRate: ResponsePostTopRate
  recommendedPlace: RecommendedPlace[] = []
  interestingPlace: InterestingPlace[] = []
  postTopRate: PostTopRate[] = []

  constructor(private router: Router, private route: ActivatedRoute,
              private authService: AuthService,
              private homeService: HomeService,
              config: NgbCarouselConfig) {
    config.interval = 100;
    config.keyboard = false;
    config.pauseOnHover = false;
  }


  ngOnInit(): void {
    this.getDataRecommendedPlace()
    this.getDataInterestingPlace()
    this.getDataPostTopRate()
    console.log(this.authService.getToken())
  }

  getDataRecommendedPlace() {
    this.homeService.getRecommendedData().subscribe(r => {
      this.recommendedPlaceResponse = r
      this.recommendedPlace = this.recommendedPlaceResponse.object
      console.log(this.recommendedPlace)
    })
  }

  getDataInterestingPlace() {
    this.homeService.getInterestingPlaceData().subscribe(i => {
      this.interestingPlaceResponse = i
      this.interestingPlace = this.interestingPlaceResponse.object
      console.log(this.interestingPlace)
    })
  }

  getDataPostTopRate() {
    this.homeService.getPostTopRateData().subscribe(i => {
      this.responsePostTopRate = i
      this.postTopRate = this.responsePostTopRate.object
      console.log(this.postTopRate)
    })
  }

  ngAfterViewInit(): void {
  }

  logout() {
    this.authService.logout()
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['ư', 'ư'],
    autoplay: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  slides = [
    {id: 1, img: "https://dummyimage.com/350x150/423b42/fff"},
    {id: 2, img: "https://dummyimage.com/350x150/2a2b7a/fff"},
    {id: 3, img: "https://dummyimage.com/350x150/1a2b7a/fff"},
    {id: 4, img: "https://dummyimage.com/350x150/7a2b7a/fff"},
    {id: 5, img: "https://dummyimage.com/350x150/9a2b7a/fff"},
    {id: 6, img: "https://dummyimage.com/350x150/5a2b7a/fff"},
    {id: 6, img: "https://dummyimage.com/350x150/4a2b7a/fff"}
  ];
}
