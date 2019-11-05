import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatProgressSpinnerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatCheckboxModule, MatNativeDateModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
