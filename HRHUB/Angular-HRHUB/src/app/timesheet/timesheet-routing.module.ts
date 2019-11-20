import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetComponent } from './timesheet.component';

const routes: Routes = [
  {
    path: 'timesheet',
    component: TimesheetComponent,
    data: { showHeader: false, showNavbar: true, showWelcomeCard: true }

  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetRoutingModule { }
