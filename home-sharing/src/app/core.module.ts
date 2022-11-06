import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {PostEditComponent} from "./posts/post-edit/post-edit.component";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {TestComponent} from "./test/test.component";
import {PostEditService} from "./posts/post-edit/post-edit.service";
import {TestService} from "./test/test.service";

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
