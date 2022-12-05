import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {FooterComponent} from './footer/footer.component';
import {DatePipe} from "@angular/common";
import {PostsComponent} from './posts/posts.component';
import {PostEditComponent} from './posts/post-edit/post-edit.component';
import {CoreModule} from "./core.module";
import {PostListComponent} from "./posts/post-list/post-list.component";
import {PostDetailComponent} from "./posts/post-detail/post-detail.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {
  ErrorStateMatcher,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  ShowOnDirtyErrorStateMatcher
} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatStepperModule} from "@angular/material/stepper";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {ProfileComponent} from './profile/profile.component';
import {MatMenuModule} from "@angular/material/menu";
import {NgbAlertModule, NgbPaginationModule, NgbModule, NgbCarouselConfig, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MatChipsModule} from "@angular/material/chips";
import {MatListModule} from "@angular/material/list";
import {ErrorPageComponent} from './error-page/error-page.component';

import {HeaderHostComponent} from './header-host/header-host.component';
import {HostComponent} from './host/host.component';
import {HostPostListComponent} from './host/host-post-list/host-post-list.component';
import {ManageRateComponent} from './host/manage-rate/manage-rate.component';
import {RateDetailComponent} from './host/rate-detail/rate-detail.component';

import {AgmCoreModule} from "@agm/core";
import {MapComponent} from './map/map.component';
import {SearchComponent} from "./search/search.component";
import {UserInfoComponent} from './profile/user-info/user-info.component';
import {HistoryBookingComponent} from './history-booking/history-booking.component';
import {PasswordComponent} from './profile/password/password.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {RateComponent} from './rate/rate.component';
import {NgxStarRatingModule} from "ngx-star-rating";
import {BookingComponent} from './booking/booking.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {TestComponent} from './test/test.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import {NgxFileDropModule} from "ngx-file-drop";
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {DatePickerComponent} from './date-picker/date-picker.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {ReportHsComponent} from './report-hs/report-hs.component';
import {VoucherComponent} from './voucher/voucher.component';
import {MatTabsModule} from "@angular/material/tabs";
import {CheckOutBookingComponent} from './host/check-out-booking/check-out-booking.component';
import {CurrentBookingDetailComponent} from './host/current-booking-detail/current-booking-detail.component';
import {ComingBookingDetailComponent} from './host/coming-booking-detail/coming-booking-detail.component';
import {ConfirmBookingComponent} from './host/confirm-booking/confirm-booking.component';
import {WaitBookingDetailComponent} from './host/wait-booking-detail/wait-booking-detail.component';
import {ComplaintReportComponent} from './host/complaint-report/complaint-report.component';
import {ManageVoucherComponent} from './host/manage-voucher/manage-voucher.component';
import {MatTableModule} from "@angular/material/table";
import {CreateVoucherComponent} from './host/create-voucher/create-voucher.component';
import {AdminComponent} from './admin/admin.component';
import {HeaderAdminComponent} from './header-admin/header-admin.component';
import {ManagePostComponent} from './admin/manage-post/manage-post.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTreeModule} from "@angular/material/tree";
import {ManagerAccountHostComponent} from './admin/manager-account/manager-account-host.component';
import {MatSortModule} from "@angular/material/sort";
import {AccountDetailComponent} from './admin/manager-account/account-detail/account-detail.component';
import {MatRadioModule} from "@angular/material/radio";
import {
  DetailAccountCustomerComponent
} from './admin/manager-account-customer/detail-account-customer/detail-account-customer.component';
import {ManagerAccountCustomerComponent} from "./admin/manager-account-customer/manager-account-customer.component";
import {CustomMatPaginatorIntl} from "./shared/CustomPaginatorConfiguration";
import {ManagerAccountCenterComponent} from './admin/manager-account-center/manager-account-center.component';
import {ManageCurrentComponent} from './host/manage-current/manage-current.component';
import {CurrentBookingComponent} from './host/manage-current/current-booking/current-booking.component';
import {ComingBookingComponent} from './host/manage-current/coming-booking/coming-booking.component';
import {ListConfirmBookingComponent} from './host/manage-current/list-confirm-booking/list-confirm-booking.component';
import {ReportDetailComponent} from './host/complaint-report/report-detail/report-detail.component';
import {ManageReportCenterComponent} from './admin/manage-report-center/manage-report-center.component';
import {ManageReportPostComponent} from './admin/manage-report-center/manage-report-post/manage-report-post.component';
import {ManageReportRateComponent} from './admin/manage-report-center/manage-report-rate/manage-report-rate.component';
import {ManageComplainComponent} from './admin/manage-report-center/manage-complain/manage-complain.component';
import {
  ReportPostDetailDialogComponent
} from './admin/manage-report-center/manage-report-post/report-post-detail-dialog/report-post-detail-dialog.component';
import {ReportRateComponent} from './report-rate/report-rate.component';
import {
  HandleStatusVoucherComponent
} from './host/manage-voucher/handle-status-voucher/handle-status-voucher.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { HandleStatusDialogComponent } from './admin/manage-report-center/manage-report-post/handle-status-dialog/handle-status-dialog.component';
import { ConfirmDialogComponent } from './shared/dialog/confirm-dialog/confirm-dialog.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import {PostVoucherDialogComponent} from "./host/host-post-list/post-voucher-dialog/post-voucher-dialog.component";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import { CheckInputNumberDirective } from './shared/directive/check-input-number.directive';
import { HistoryHandleReportComponent } from './admin/manage-report-center/history-handle-report/history-handle-report.component';
import { CreateComplaintReportComponent } from './host/complaint-report/create-complaint-report/create-complaint-report.component';
import { ProvincePickerComponent } from './shared/dialog/province-picker/province-picker.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    PostsComponent,
    PostListComponent,
    PostDetailComponent,
    PostEditComponent,
    ProfileComponent,
    ErrorPageComponent,
    HeaderHostComponent,
    HostComponent,
    HostPostListComponent,
    ManageRateComponent,
    RateDetailComponent,
    MapComponent,
    SearchComponent,
    UserInfoComponent,
    HistoryBookingComponent,
    PasswordComponent,
    RateComponent,
    BookingComponent,
    TestComponent,
    DatePickerComponent,
    ReportHsComponent,
    VoucherComponent,
    CheckOutBookingComponent,
    CurrentBookingDetailComponent,
    ComingBookingDetailComponent,
    ConfirmBookingComponent,
    WaitBookingDetailComponent,
    ComplaintReportComponent,
    ManageVoucherComponent,
    CreateVoucherComponent,
    AdminComponent,
    HeaderAdminComponent,
    ManagePostComponent,
    ManagerAccountHostComponent,
    AccountDetailComponent,
    DetailAccountCustomerComponent,
    ManagerAccountCustomerComponent,
    ManagerAccountCenterComponent,
    ManageCurrentComponent,
    CurrentBookingComponent,
    ComingBookingComponent,
    ListConfirmBookingComponent,
    ReportDetailComponent,
    ManageReportCenterComponent,
    ManageReportPostComponent,
    ManageReportRateComponent,
    ManageComplainComponent,
    ReportPostDetailDialogComponent,
    ReportRateComponent,
    HandleStatusVoucherComponent,
    HandleStatusDialogComponent,
    ConfirmDialogComponent,
    PaymentComponent,
    PaymentSuccessComponent,
    PostVoucherDialogComponent,
    CheckInputNumberDirective,
    HistoryHandleReportComponent,
    CreateComplaintReportComponent,
    ProvincePickerComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    CoreModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    NgbPaginationModule, NgbAlertModule, NgbModule,

    MatChipsModule, MatListModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBzZjzi7HqlyEKfmqTRNLge9TtMPDaI7VM'
    }),
    MatSnackBarModule,
    NgxStarRatingModule, MatCheckboxModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxDropzoneModule,
    NgxFileDropModule,
    MatPaginatorModule,
    MatCardModule, MatDialogModule,
    MatNativeDateModule, FormsModule,
    MatTabsModule, MatTableModule, MatSidenavModule, MatExpansionModule, MatTreeModule, MatSortModule, MatRadioModule, MatTooltipModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [
    DatePipe,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: MAT_DATE_LOCALE, useValue: 'vi-Vi'},
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
