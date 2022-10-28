import {Component, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatMenuTrigger} from "@angular/material/menu";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {map, shareReplay, startWith, switchMap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {PostService} from "./post.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {



  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }

  print() {
console.log('aaaaaaaaaaa')
  }
  filteredDMOptions = <any>[];
  sampleForm: FormGroup;

  dm$ = this.service.getData().pipe(shareReplay());

  ngOnInit() {
    // more code...
    this.filteredDMOptions = this.sampleForm
      .get('fc_dmanager')
      .valueChanges.pipe(
        startWith(''),
        switchMap((term) => {
          return this.dm$.pipe(
            map((dmOptions) => {
              return dmOptions.filter((dm) =>
                dm.name.toLowerCase().includes(term.toLowerCase())
              );
            })
          );
        })
      )
  }

  constructor(private service: PostService, private fb: FormBuilder) {
    this.sampleForm = this.fb.group({
      fc_dmanager: [''],
      data: ['']
    })
  }
}
