import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LeaveComponent } from './leave.component';
import { CanDeactivateGuard } from '../auth/can-deactivate-guard.service';
const routes: Routes = [
  {
    path: 'leave',
    component: LeaveComponent,
    canDeactivate: [CanDeactivateGuard],
    data: { showHeader: false, showNavbar: true, showWelcomeCard: true }

  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
