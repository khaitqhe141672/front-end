import {Component, OnInit} from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'home-sharing';

  showHead: boolean = false;

  constructor(private router: Router,private authService:AuthService) {
    // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/auth/login') {
          this.showHead = false;
        }else if(event['url'] == '/auth/register'){
          this.showHead = false;
        }else {
          // console.log("NU")
          this.showHead = true;
        }
      }
    });
  }

  ngOnInit(): void {
    this.authService.autoLogin()
  }

}
