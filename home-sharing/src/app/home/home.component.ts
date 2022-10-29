import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {HomeService} from "./home.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecommendedPlace, RecommendedPlaceResponse} from "../shared/model/RecommendedPlace.model";
import {InterestingPlace, InterestingPlaceResponse} from "../shared/model/InterestingPlace.model";
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";
import {PostTopRate, ResponsePostTopRate} from "../shared/model/PostYopRate.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit,AfterViewInit {

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
}
