import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NavbarComponent
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    NavbarComponent
  ]
})
export class LayoutModule { }
