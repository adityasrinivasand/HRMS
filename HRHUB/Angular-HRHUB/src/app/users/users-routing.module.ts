import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './users.component';
import { CanDeactivateGuard } from '../auth/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canDeactivate: [CanDeactivateGuard],
    data: { showHeader: false, showNavbar: true, showWelcomeCard: true }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
