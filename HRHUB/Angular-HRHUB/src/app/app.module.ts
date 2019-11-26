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
import {MatFormFieldModule, MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import { MatInputModule, MatCardModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatSlideToggleModule, MatSnackBar, MatSnackBarModule } from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeaveComponent } from './leave/leave.component';
import { LeaveRoutingModule } from './leave/leave-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component' ;
import { ContactsComponent } from './contacts/contacts.component';
import { ContactsRoutingModule } from './contacts/contacts-routing.module';
import { TokenInterceptor } from './auth/token.interceptor';
import { TokenInterceptorService } from './auth/token-interceptor.service';
import { AuthService } from './auth/auth.service';
import { JwtHelperService, JwtModule, JwtModuleOptions, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { TimesheetRoutingModule } from '../app/timesheet/timesheet-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { SetpasswordComponent } from './setpassword/setpassword.component';
import { SetpasswordRoutingModule } from './setpassword/setpassword-routing.module';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ForgotpasswordRoutingModule } from './forgotpassword/forgotpassword-routing.module';
import { FieldErrorDisplayModule } from './field-error-display/field-error-display.module';

@NgModule({
  declarations: [
    AppComponent,
    LeaveComponent,
    PageNotFoundComponent,
    ContactsComponent,
    TimesheetComponent,
    SetpasswordComponent,
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
    MatSlideToggleModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ContactsRoutingModule,
    MatTableModule,
    TimesheetRoutingModule,
    SetpasswordRoutingModule,
    ForgotpasswordRoutingModule,
    MatSnackBarModule,
    FieldErrorDisplayModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    AuthService,
    { 
      provide: JWT_OPTIONS, useValue: JWT_OPTIONS 
    },
    JwtHelperService,
    CookieService,
    MatSnackBar 
    
  ]
})
export class AppModule { }
