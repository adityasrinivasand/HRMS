import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AccountSettingsModule } from './account-settings/account-settings.module';
import { LoginModule } from './login/login.module';
import { UsersModule } from './users/users.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeaveComponent } from './leave/leave.component';
import { LeaveRoutingModule } from './leave/leave-routing.module';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ForgotpasswordRoutingModule } from './forgotpassword/forgotpassword-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    LeaveComponent,
    ForgotpasswordComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    FlexLayoutModule,
    LayoutModule,
    DashboardModule,
    AccountSettingsModule,
    LoginModule,
    UsersModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    NgbModule,
    LeaveRoutingModule,
    ForgotpasswordRoutingModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
