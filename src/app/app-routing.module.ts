import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppAuthGuardService} from './core/providers/app-auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/public/public.module').then((m) => m.PublicModule),
  },
  {
    path: 'dashboard',
    canActivate: [AppAuthGuardService],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
