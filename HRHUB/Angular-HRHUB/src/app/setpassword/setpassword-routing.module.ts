import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SetpasswordComponent } from './setpassword.component';

const routes: Routes = [
  {
    path: 'setpassword',
    component: SetpasswordComponent,
    data: { showHeader: true, showNavbar: false, showWelcomeCard: false }
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetpasswordRoutingModule { }
