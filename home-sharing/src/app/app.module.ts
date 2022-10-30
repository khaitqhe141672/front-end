import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import { FooterComponent } from './footer/footer.component';
import { DetailComponent } from './detail/detail.component';
import {DatePipe} from "@angular/common";
import { PostsComponent } from './posts/posts.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import {CoreModule} from "./core.module";
import {PostListComponent} from "./posts/post-list/post-list.component";
import {PostDetailComponent} from "./posts/post-detail/post-detail.component";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatStepperModule} from "@angular/material/stepper";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import { ProfileComponent } from './profile/profile.component';
import {MatMenuModule} from "@angular/material/menu";
import {NgbAlertModule, NgbPaginationModule, NgbModule, NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";
import {MatChipsModule} from "@angular/material/chips";
import {MatListModule} from "@angular/material/list";
import { ErrorPageComponent } from './error-page/error-page.component';
import { HeaderHostComponent } from './header-host/header-host.component';
import { HostComponent } from './host/host.component';
import { HostPostListComponent } from './host/host-post-list/host-post-list.component';
import { ManageRateComponent } from './host/manage-rate/manage-rate.component';
import { RateDetailComponent } from './host/rate-detail/rate-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    DetailComponent,
    PostsComponent,
    PostListComponent,
    PostDetailComponent,
    PostEditComponent,
    ProfileComponent,
    ErrorPageComponent,
    HeaderHostComponent,
    HostComponent,
    HostPostListComponent,
    ManageRateComponent,
    RateDetailComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    CoreModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    NgbPaginationModule, NgbAlertModule, NgbModule, MatChipsModule, MatListModule
  ],
  providers: [DatePipe,AuthInterceptorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
