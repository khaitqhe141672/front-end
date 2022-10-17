import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {NgModule} from "@angular/core";
import {PostEditComponent} from "./posts/post-edit/post-edit.component";

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
