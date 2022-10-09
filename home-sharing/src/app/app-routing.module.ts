import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth/auth.component";
const appRoute: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'auth',component:AuthComponent}
]
@NgModule({
  imports:[RouterModule.forRoot(appRoute)],
  exports:[RouterModule]
})
export class AppRoutingModule{

}
