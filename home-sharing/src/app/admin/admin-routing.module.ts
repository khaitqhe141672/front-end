import {RouterModule, Routes} from "@angular/router";
import {ManagerAccountHostComponent} from "./manager-account/manager-account-host.component";
import {ManagerAccountCustomerComponent} from "./manager-account-customer/manager-account-customer.component";
import {ManagePostComponent} from "./manage-post/manage-post.component";
import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {ManagerAccountCenterComponent} from "./manager-account-center/manager-account-center.component";

const routes: Routes = [
  {path: '', component:AdminComponent,
  children:[
    {path: 'manager-account',component:ManagerAccountCenterComponent,children:[
        {path: 'manager-account-host', component: ManagerAccountHostComponent},
        {path: 'manager-account-customer', component: ManagerAccountCustomerComponent},
      ]},
    {path: 'manage-post', component: ManagePostComponent}
  ]},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
