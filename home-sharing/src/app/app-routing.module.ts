import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {DetailComponent} from "./detail/detail.component";
import {PostsComponent} from "./posts/posts.component";
import {PostDetailComponent} from "./posts/post-detail/post-detail.component";
import {PostEditComponent} from "./posts/post-edit/post-edit.component";
import {PostListComponent} from "./posts/post-list/post-list.component";
import {PostResolverService} from "./posts/post-resolver.service";
import {SearchComponent} from "./search/search.component";
import {ProfileComponent} from "./profile/profile.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {HasRoleCusGuard} from "./guard/has-role-cus.guard";
import {HasRoleGuard} from "./guard/has-role.guard";

import {HostComponent} from "./host/host.component";
import {HostPostListComponent} from "./host/host-post-list/host-post-list.component";
import {ManageRateComponent} from "./host/manage-rate/manage-rate.component";
import {RateDetailComponent} from "./host/rate-detail/rate-detail.component";

import {MapComponent} from "./map/map.component";
import {AuthGuard} from "./guard/auth.guard";
import {UserInfoComponent} from "./profile/user-info/user-info.component";
import {PasswordComponent} from "./profile/password/password.component";
import {HistoryBookingComponent} from "./history-booking/history-booking.component";
import {RateComponent} from "./rate/rate.component";
import {BookingComponent} from "./booking/booking.component";
import {TestComponent} from "./test/test.component";
import {PostByLocationComponent} from "./posts/post-by-location/post-by-location.component";


const appRoute: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'auth', children: [
      {path: '', component: LoginComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]

  },

  // {path: 'test', component: BookingComponent},

  {path: 'test', component: TestComponent},

  {path: 'home', component: HomeComponent},
  {
    path: 'profile', component: ProfileComponent,
    canActivate: [HasRoleGuard], children: [
      {path: '', component: UserInfoComponent},
      {path: 'password', component: PasswordComponent},
      {path: 'history-booking', component: HistoryBookingComponent}
    ]

  },
  // {path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent},
  {
    path: 'posts', children: [
      {path: '', component: PostsComponent},
      {path: 'post-detail/:id', component: PostDetailComponent, resolve: [PostResolverService]},
      // children:[
      //   {path: ':id',component: PostDetailComponent}
      // ]
      {path: 'post-edit', component: PostEditComponent, canActivate: [HasRoleGuard]},
      {path: 'post-list', component: PostListComponent},
      {path: 'post-by-location', component: PostByLocationComponent}
    ]
  },
  {
    path: 'hosts', children: [
      {path: '', component: HostComponent},
      {path: 'host-post-list', component: HostPostListComponent},
      {
        path: 'manage-rate', children: [
          {path: '', component: ManageRateComponent},
          {path: 'rate-detail', component: RateDetailComponent}
        ]
      }
    ]
  },
  {path: 'search', component: SearchComponent},
  {path: 'error', component: ErrorPageComponent},
  {path: '**', component: ErrorPageComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
