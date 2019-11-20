import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './users.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    data: { showHeader: false, showNavbar: true, showWelcomeCard: true }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
