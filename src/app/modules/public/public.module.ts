import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule, MatMenuModule} from '@angular/material';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: HomePageComponent,
        data: {
          title: 'Tu música, en cualquier lugar  | SpotiApp',
          description: '',
        },
      },
    ]),
    TranslateModule,
    MatMenuModule,
    MatIconModule,
  ],
  exports: [],
  providers: [],
})
export class PublicModule {}
