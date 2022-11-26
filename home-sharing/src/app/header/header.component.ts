import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subject, Subscription} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {HeaderService} from "./header.service";
import {ListPostSearched, ListProvinceSearched, SearchResponse} from "../shared/model/search.model";
import {Router} from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,AfterViewInit {
  isOpen = false
  listProvince:ListProvinceSearched[] = []
  listPost:ListPostSearched[]=[]
  @ViewChild('owl')owl:ElementRef;
  @ViewChild('divSearched') divSearched:ElementRef
  token = JSON.parse(localStorage.getItem("userData"));
  formSearch:FormGroup
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = true;
    } else {
      this.isOpen = false;

    }
  }
  constructor(private eRef: ElementRef,private router:Router,private auth:AuthService,private fb:FormBuilder,private headerService:HeaderService) { }
  private readonly searchSubject = new Subject<string | undefined>();
  searchSubscription?: Subscription;
  ngOnInit(): void {
    this.formSearch = this.fb.group({
      searchCtrl:['']
    })

    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchQuery) =>{
          console.log('searchQuery: '+searchQuery)
          return this.headerService.searchData(searchQuery)
        })
      )
      .subscribe((results:SearchResponse) => {
        this.listProvince = results.data.listProvince
        this.listPost = results.data.listPost
        this.isOpen = true
        console.log( this.listPost)
      },()=>{
        console.log('error')
        }
      );

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
    this.auth.logout()
  }


  onSearching(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    if(searchQuery!='')
    this.searchSubject.next(searchQuery?.trim());
    else {
      this.listProvince = []
      this.listPost = []
      this.isOpen = false
    }
  }

  onSearchMore() {
    this.router.navigate(['../search'])
    this.isOpen = false
  }


  showMore(number: number) {

  }

  goPostDetail(postID: number) {
    this.router.navigate(['../posts/post-detail/'+postID])
    this.isOpen  = false
  }
}
