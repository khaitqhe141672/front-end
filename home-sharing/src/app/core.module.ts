import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {PostEditComponent} from "./posts/post-edit/post-edit.component";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";

@NgModule({
  providers: [ PostEditComponent,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }
  ],
})
export class CoreModule{

}
