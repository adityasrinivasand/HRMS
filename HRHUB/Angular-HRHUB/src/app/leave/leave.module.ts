import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
// tslint:disable-next-line: max-line-length
import { MatCardModule, MatProgressSpinnerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatButtonModule, MatDialog, MatDialogRef, MatSnackBarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { LeaveComponent } from './leave.component';
import { FieldErrorDisplayModule } from '../field-error-display/field-error-display.module';

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
    HttpClientModule,
    MatDialog, 
    MatDialogRef,
    MatSnackBarModule,
    FieldErrorDisplayModule
  ]
})
export class LeaveModule { }
