import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './users.component';
import { AuthGuardService} from '../auth/auth-guard.service';
const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    data: { showHeader: false, showNavbar: true, showWelcomeCard: true },
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
