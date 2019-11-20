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
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule, MatCardModule, MatButtonModule } from '@angular/material';
import {A11yModule} from '@angular/cdk/a11y';
import { WelcomecardComponent } from './welcomecard/welcomecard.component';





@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    A11yModule,
    MatCardModule,
    MatButtonModule

  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    WelcomecardComponent
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    WelcomecardComponent
  ]
})
export class LayoutModule { }
