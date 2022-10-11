import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login',
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
  },
  { 
    path: 'dashboard', 
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    // canLoad:[AuthCoreGuard]
  },
  { 
    path: 'marine-display', 
    loadChildren: () => import('./marine-display/marine-display.module').then(m => m.MarineDisplayModule),
    // canLoad:[AuthCoreGuard]
  },
  { 
    path: 'analytics', 
    loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule),
    // canLoad:[AuthCoreGuard]
  },
  { 
    path: 'export-data', 
    loadChildren: () => import('./export-data/export-data.module').then(m => m.ExportDataModule),
    // canLoad:[AuthCoreGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
