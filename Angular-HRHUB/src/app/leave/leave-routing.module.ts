import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LeaveComponent } from './leave.component';

const routes: Routes = [
  {
    path: 'leave/:id',
    component: LeaveComponent,
    data: { showHeader: false, showNavbar: true, showWelcomeCard: true }
  }
];


@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
