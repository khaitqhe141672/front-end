import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Voucher} from "../../../shared/model/voucher.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {Observable} from "rxjs";
import {debounceTime, map, startWith} from "rxjs/operators";
import {PostEditService} from "../../../posts/post-edit/post-edit.service";
import {VoucherService} from "../../../voucher/voucher.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-post-voucher-dialog',
  templateUrl: './post-voucher-dialog.component.html',
  styleUrls: ['./post-voucher-dialog.component.css']
})
export class PostVoucherDialogComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  vouchers: string[] = [];
  saveVouchers: Voucher[] = []
  allVoucher: Voucher[] = [];
  formVoucher: FormGroup
  filteredVoucher: Observable<Voucher[]>;
  @ViewChild('voucherInput') voucherInput: ElementRef<HTMLInputElement>;

  constructor(@Inject(MAT_DIALOG_DATA) public  data:number,private fb: FormBuilder, private postEditService: PostEditService,private voucherService:VoucherService,private postVoucherDialogRef:MatDialogRef<PostVoucherDialogComponent>) {
  }

  ngOnInit(): void {
    this.formVoucher = this.fb.group({
      vouchers: ['']
    })
    this.getVoucher()
  }

  getVoucher() {
    this.postEditService.getVoucher().subscribe(voucherResponse => {
      this.allVoucher = voucherResponse.object
      this.filterVoucher()
    })
    this.voucherService.getVouchers(this.data).subscribe(response=>{
      console.log(response)
      this.saveVouchers = response.object.map(voucher=>{
        let voucherConverted = {
          idVoucher: voucher.voucherID,
          nameVoucher: voucher.code,
          description: voucher.description,
          percent: voucher.percent,
          dueDate: 0,
          status:voucher.status
        } as Voucher
        this.vouchers.push(this.displayVoucher(voucherConverted))
        return voucherConverted
      })
      console.log(this.saveVouchers)
    })

  }

  removeVouchers(voucher: Voucher): void {
    console.log(voucher)

    const index = this.vouchers.indexOf(voucher.nameVoucher);
    const index2 = this.saveVouchers.indexOf(voucher)
    if (index >= 0) {
      this.vouchers.splice(index, 1);
      this.saveVouchers.splice(index2, 1)
    }
    console.log('index: '+index)
    console.log('index 2 '+index2)
    console.log('size save voucher: ' + this.saveVouchers.length)
    console.log('remove voucher ' + JSON.stringify(this.saveVouchers))
  }

  addVoucher(event): void {
    const value = (event.value || '').trim();

    if (value) {
      this.vouchers.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
    // console.log('add ' + value)
    this.formVoucher.controls['vouchers'].setValue(null);
  }

  selectedVoucher(event: MatAutocompleteSelectedEvent): void {
    this.vouchers.push(event.option.viewValue);
    this.onAddVoucherData(event.option.value);
  }

  onAddVoucherData(voucher: Voucher) {
    this.saveVouchers.push(voucher)
    this.voucherInput.nativeElement.value = '';
    this.voucherInput.nativeElement.blur();
    this.formVoucher.controls['vouchers'].setValue(null);
    // console.log('selected voucher ' + JSON.stringify(this.saveVouchers))
  }

  filterVoucher() {
    this.filteredVoucher =
      this.formVoucher.controls['vouchers'].valueChanges.pipe(
        startWith(null),
        debounceTime(500),
        map((voucher: string | null) => {
            if (voucher) return this._filterVoucher(voucher)
            else return this.allVoucher.slice()
          }
        ),
      )
  }

  toLowerCaseNonAccentVietnamese(str) {
    str = str.toLowerCase();
    str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a");
    str = str.replace(/[èéẹẻẽêềếệểễ]/g, "e");
    str = str.replace(/[ìíịỉĩ]/g, "i");
    str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o");
    str = str.replace(/[ùúụủũưừứựửữ]/g, "u");
    str = str.replace(/[ỳýỵỷỹ]/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/[\u0300\u0301\u0303\u0309\u0323]/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/[\u02C6\u0306\u031B]/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  }

  private _filterVoucher(value: any): Voucher[] {
    const filterValue = value.name || value;
    return this.allVoucher.filter(voucher => this.toLowerCaseNonAccentVietnamese(voucher.nameVoucher).includes(this.toLowerCaseNonAccentVietnamese(filterValue.toLowerCase())));
  }
  displayVoucher(voucher: Voucher) {
    return voucher ? voucher.nameVoucher : ''
  }

  onAddVoucher() {
    console.log(this.saveVouchers)
    this.postVoucherDialogRef.close(this.saveVouchers)
  }
}
