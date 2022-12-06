import {RouterModule, Routes} from "@angular/router";
import {ManagerAccountHostComponent} from "./manager-account/manager-account-host.component";
import {ManagerAccountCustomerComponent} from "./manager-account-customer/manager-account-customer.component";
import {ManagePostComponent} from "./manage-post/manage-post.component";
import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {ManagerAccountCenterComponent} from "./manager-account-center/manager-account-center.component";
import {ManageReportCenterComponent} from "./manage-report-center/manage-report-center.component";
import {ManageReportPostComponent} from "./manage-report-center/manage-report-post/manage-report-post.component";
import {ManageReportRateComponent} from "./manage-report-center/manage-report-rate/manage-report-rate.component";
import {ManageComplainComponent} from "./manage-report-center/manage-complain/manage-complain.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";

const routes: Routes = [
  {path: '', component:AdminComponent,
  children:[
    {path: 'manager-account',component:ManagerAccountCenterComponent,children:[
        {path: 'manager-account-host', component: ManagerAccountHostComponent},
        {path: 'manager-account-customer', component: ManagerAccountCustomerComponent},
      ]},
    {path: 'manage-post', component: ManagePostComponent},
    {path:'manage-report',component:ManageReportCenterComponent,children:[
        {path: 'manage-report-post',component: ManageReportPostComponent},
        {path: 'manage-report-rate',component: ManageReportRateComponent},
        {path: 'manage-complain',component: ManageComplainComponent}
      ]},
    {path:'dashboard',component:AdminDashboardComponent}
  ]},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
