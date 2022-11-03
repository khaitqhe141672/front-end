import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  selected: Date | null;

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  colorControl = new FormControl('primary');
  fontSizeControl = new FormControl(16, Validators.min(10));
  options = this._formBuilder.group({
    color: this.colorControl,
    fontSize: this.fontSizeControl,
  });

  getFontSize() {
    return Math.max(0, this.fontSizeControl.value || 0);
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


