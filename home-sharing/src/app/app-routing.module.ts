import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth/auth.component";
import {HomeComponent} from "./home/home.component";
const appRoute: Routes = [
  {path:'',redirectTo:'auth',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'auth',component:AuthComponent}
]
@NgModule({
  imports:[RouterModule.forRoot(appRoute )],
  exports:[RouterModule]
})
export class AppRoutingModule{

}
