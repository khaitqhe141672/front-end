import {Component, OnInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

    $('.abc').owlCarousel({
      items: 1,
      animateOut: 'fadeOut',
      loop: true,
      nav: true,
      navText: [`<div class='nav-btn prev-slide' style="position: absolute; top: 120px !important; left: 30px;">
              <svg width="51" height="65" viewBox="0 0 51 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.5">
              <path d="M43.0392 5.14166C39.6233 2.18899 34.5585 2.18899 31.1427 5.14166L8.75216 24.496C4.13817 28.4843 4.13817 35.6384 8.75216 39.6268L31.1427 58.9811C34.5585 61.9338 39.6233 61.9338 43.0392 58.9811C47.236 55.3534 47.236 48.8461 43.0392 45.2184L36.5703 39.6268C31.9564 35.6384 31.9564 28.4843 36.5703 24.496L43.0392 18.9044C47.236 15.2766 47.236 8.76939 43.0392 5.14166Z" fill="white"/>
              </g>
              </svg>
          </div>`,
        `<div class='nav-btn next-slide' style="position: absolute; top: 120px !important; right: 30px">
            <svg width="46" height="65" viewBox="0 0 46 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.5515 5.75596C15.1939 2.5382 9.89696 2.5382 6.53938 5.75596C2.97364 9.17321 2.97364 14.8728 6.53938 18.2901L13.3756 24.8416C17.4834 28.7783 17.4834 35.3444 13.3756 39.2812L6.53938 45.8327C2.97365 49.2499 2.97364 54.9496 6.53938 58.3668C9.89696 61.5846 15.1939 61.5846 18.5515 58.3668L38.4665 39.2812C42.5743 35.3444 42.5743 28.7783 38.4665 24.8416L18.5515 5.75596Z" fill="white" fill-opacity="0.5"/>
            </svg>
          </div>`],
    });

    // $('.container-home .slider .abc .owl-dots').css({'position': 'absolute', 'top': '290px', 'right' : '50%'});
    //
    // $('.place-carousel').owlCarousel({
    //   stagePadding: 50,
    //   dots: false,
    //   loop: true,
    //   margin: 10,
    //   nav: true,
    //   navText: [`<div class='nav-btn prev-slide' style="position: absolute; top: 50px !important; left: 0px;">
    //         <svg width="75" height="69" viewBox="0 0 75 69" fill="none" xmlns="http://www.w3.org/2000/svg">
    //         <ellipse cx="37.3604" cy="34.5" rx="37.3604" ry="34.5" fill="#F3F1F1"/>
    //         <path d="M43.2313 43.5L31.4895 34L43.2313 24.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    //         </svg>
    //       </div>`,
    //     `<div class='nav-btn next-slide' style="position: absolute; top: 50px !important; right: 0px;">
    //         <svg width="76" height="69" viewBox="0 0 76 69" fill="none" xmlns="http://www.w3.org/2000/svg">
    //         <ellipse cx="38.3025" cy="34.5" rx="37.3604" ry="34.5" fill="#F3F1F1"/>
    //         <path d="M37.8805 24.8052L49.7344 34.1822L38.1061 43.804" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    //         </svg>
    //       </div>`],
    //   responsiveClass:true,
    //   responsive:{
    //     0:{
    //       items:1,
    //     },
    //     600:{
    //       items:3,
    //     },
    //     1000:{
    //       items:4,
    //     }
    //   }
    // });
    //
    // $('.top_room-carousel').owlCarousel({
    //   stagePadding: 50,
    //   dots: false,
    //   loop: true,
    //   margin: 10,
    //   nav: true,
    //   navText: [`<div class='nav-btn prev-slide' style="position: absolute; top: 50px !important; left: 0px;">
    //         <svg width="75" height="69" viewBox="0 0 75 69" fill="none" xmlns="http://www.w3.org/2000/svg">
    //         <ellipse cx="37.3604" cy="34.5" rx="37.3604" ry="34.5" fill="#F3F1F1"/>
    //         <path d="M43.2313 43.5L31.4895 34L43.2313 24.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    //         </svg>
    //       </div>`,
    //     `<div class='nav-btn next-slide' style="position: absolute; top: 50px !important; right: 0px;">
    //         <svg width="76" height="69" viewBox="0 0 76 69" fill="none" xmlns="http://www.w3.org/2000/svg">
    //         <ellipse cx="38.3025" cy="34.5" rx="37.3604" ry="34.5" fill="#F3F1F1"/>
    //         <path d="M37.8805 24.8052L49.7344 34.1822L38.1061 43.804" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    //         </svg>
    //       </div>`],
    //   responsiveClass:true,
    //   responsive:{
    //     0:{
    //       items:1,
    //     },
    //     600:{
    //       items:3,
    //     },
    //     1000:{
    //       items:4,
    //     }
    //   }
    // });
    //
    // $('.container-home .experience_place .owl-stage-outer').css({'max-width': '1100px', 'margin': 'auto'});
    // $('.container-home .experience_place .nav-btn svg').css({'width': '50px'});
    // $('.container-home .experience_place .owl-nav').css({'margin-top': '0'});
    // $('.container-home .experience_place .owl-item').css({'width': '265px', 'height': '229px'});
    // $('.container-home .top_room-carousel .owl-stage-outer').css({'max-width': '1100px', 'margin': 'auto'});
    // $('.container-home .top_room-carousel .nav-btn svg').css({'width': '50px'});
    // $('.container-home .top_room-carousel .owl-nav').css({'margin-top': '0'});
    // $('.container-home .top_room-carousel .owl-item').css({'width': '265px', 'height': '229px'});
  }

}
