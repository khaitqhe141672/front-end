import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HostComponent} from "./host.component";
import {HostPostListComponent} from "./host-post-list/host-post-list.component";
import {ManageRateComponent} from "./manage-rate/manage-rate.component";
import {RateDetailComponent} from "./rate-detail/rate-detail.component";
import {ManageVoucherComponent} from "./manage-voucher/manage-voucher.component";
import {ManageCurrentComponent} from "./manage-current/manage-current.component";
import {CurrentBookingComponent} from "./manage-current/current-booking/current-booking.component";
import {ComingBookingComponent} from "./manage-current/coming-booking/coming-booking.component";
import {ListConfirmBookingComponent} from "./manage-current/list-confirm-booking/list-confirm-booking.component";

const routes: Routes = [
  {
    path: '', component: HostComponent,
    children: [
      {
        path: 'manage-current', component: ManageCurrentComponent,
        children: [
          {path: 'current-booking', component: CurrentBookingComponent},
          {path: 'coming-booking', component: ComingBookingComponent},
          {path: 'confirm-booking', component: ListConfirmBookingComponent}
        ]
      },
      {path: 'host-post-list', component: HostPostListComponent},
      {
        path: 'manage-rate', children: [
          {path: '', component: ManageRateComponent},
          {path: 'rate-detail/:id', component: RateDetailComponent}
        ]
      },
      {path: 'manage-voucher', component: ManageVoucherComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostRoutingModule {

}
