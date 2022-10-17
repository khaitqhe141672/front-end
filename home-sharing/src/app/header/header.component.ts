import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  token = JSON.parse(localStorage.getItem("userData"));

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    const navBar = document.querySelector(".header");
    window.addEventListener("scroll", e => {
      const scrollHeight = window.pageYOffset;
      const navHeight = navBar.getBoundingClientRect().height;
      if (scrollHeight > navHeight) {
        navBar.classList.add("fix__nav");
      } else {
        navBar.classList.remove("fix__nav");
      }
    });

    $(document).ready(function () {
      $(".dropdown").click(function () {
        $(this).find(".dropdown-content").slideToggle("fast");
      });
    });
    $(document).on("click", function (event) {
      var $trigger = $(".dropdown");
      if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $(".dropdown-content").slideUp("fast");
      }
    });
  }

}
