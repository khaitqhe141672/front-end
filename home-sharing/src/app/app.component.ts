import {Component, OnInit} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'home-sharing';

  showHead: boolean = false;

  role = JSON.parse(localStorage.getItem("role"));

  constructor(private router: Router, private authService: AuthService) {
    // on route change to '/login', set the variable showHead to false

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/auth/login') {
          this.showHead = false;
        } else if (event['url'] == '/auth/register') {
          this.showHead = false;
        } else {
          // console.log("NU")
          this.showHead = true;
        }
      }
    });
  }

  ngOnInit(): void {
    this.authService.autoLogin()
    this.headerDisplay()
  }

  headerHost: boolean = false
  headerCustomer: boolean = false
  headerAdmin: boolean = false

  headerDisplay() {
    if (this.role === "ROLE_HOST") {
      console.log(this.role)
      this.headerHost = true;
      this.headerAdmin = false;
      this.headerCustomer = false;
    } else if (this.role === "ROLE_ADMIN") {
      this.headerHost = false;
      this.headerCustomer = false;
      this.headerAdmin = true;
    } else {
      this.headerHost = false;
      this.headerCustomer = true;
      this.headerAdmin = false;
    }
  }

}
