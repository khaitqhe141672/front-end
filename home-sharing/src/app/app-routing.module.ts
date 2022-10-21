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

const appRoute: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'auth', children: [
      {path: '',component: LoginComponent},
      {path:'login',component:LoginComponent},
      {path:'register',component:RegisterComponent}
    ]

  },
  {path: 'home', component: HomeComponent},
  // {path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent},
  {path:'posts',children:[
      {path: '',component: PostsComponent},
      {path: 'post-detail/:id',component: PostDetailComponent,resolve:[PostResolverService]},
      // children:[
        //   {path: ':id',component: PostDetailComponent}
        // ]
      {path: 'post-edit',component: PostEditComponent},
      {path: 'post-list',component: PostListComponent}

    ]},
  {path: 'search', component: SearchComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
