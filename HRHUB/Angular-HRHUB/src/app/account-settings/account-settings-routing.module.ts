import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountSettingsComponent} from './account-settings.component';
import { AuthGuardService as AuthGuard } from '../auth/auth-guard.service';

const routes: Routes = [
  { path: 'account-settings', component: AccountSettingsComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSettingsRoutingModule { }
