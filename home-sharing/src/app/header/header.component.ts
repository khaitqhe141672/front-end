import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,AfterViewInit {

  token = JSON.parse(localStorage.getItem("userData"));

  constructor(private auth:AuthService) { }

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

  logout() {
    // this.user.next(null);
    // this.router.navigate(['auth/login'])

    localStorage.removeItem("userData")
    localStorage.removeItem('role')
    localStorage.removeItem('token')
    this.auth.logout()
  }
}
