import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
// tslint:disable-next-line: max-line-length
import { MatCardModule, MatProgressSpinnerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { AuthGuardService} from '../auth/auth-guard.service';
import { LeaveComponent } from './leave.component';
import { AuthService } from '../auth/auth.service';



@NgModule({
  declarations: [LeaveComponent],
  imports: [
    CommonModule,
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
    MatNativeDateModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule


  ]
})
export class LeaveModule { }
