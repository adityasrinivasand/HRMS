import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormField, MatInputModule, MatSnackBarModule } from '@angular/material';
import { FieldErrorDisplayComponent } from '../field-error-display/field-error-display.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatInputModule,
    MatSnackBarModule,
    FieldErrorDisplayComponent
  ]
})
export class ForgotpasswordModule { }
