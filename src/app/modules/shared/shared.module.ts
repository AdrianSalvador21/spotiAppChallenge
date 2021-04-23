import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule, MatMenuModule} from '@angular/material';
import { HeaderComponent } from './components/header/header.component';
import {DomseguroPipe} from './pipes/domseguro.pipe';

@NgModule({
  declarations: [HeaderComponent, DomseguroPipe],
  imports: [
    CommonModule,
    TranslateModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
  ],
  exports: [HeaderComponent, DomseguroPipe],
  providers: [],
})
export class SharedModule {}
