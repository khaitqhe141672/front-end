import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {PostEditComponent} from "./posts/post-edit/post-edit.component";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {PostEditService} from "./posts/post-edit/post-edit.service";

@NgModule({
  providers: [ PostEditComponent,PostEditComponent,PostEditService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }
  ],
})
export class CoreModule{

}
