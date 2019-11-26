import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormField, MatInputModule } from '@angular/material';
import { FieldErrorDisplayComponent } from '../field-error-display/field-error-display.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatInputModule,
    FieldErrorDisplayComponent
  ]
})
export class ForgotpasswordModule { }
