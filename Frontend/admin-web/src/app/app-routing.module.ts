import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { PermissionGuard } from './core/guard/permission.guard';


const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        // canActivate: [PermissionGuard],
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        // data: {permission: 'dashboard'}
      },
      {
        path: 'hospitals',
        // canActivate: [PermissionGuard],
        loadChildren: () => import('./views/pages/hospitals/hospitals.module').then(m => m.HospitalsModule),
        // data: {permission: ''}
      },
      {
        path: 'ambulances',
        // canActivate: [PermissionGuard],
        loadChildren: () => import('./views/pages/ambulances/ambulances.module').then(m => m.AmbulancesModule),
        // data: {permission: ''}
      },
      {
        path: 'users',
        // canActivate: [PermissionGuard],
        loadChildren: () => import('./views/pages/users/users.module').then(m => m.UsersModule),
        // data: {permission: ''}
      },
      {
        path: 'bookings',
        // canActivate: [PermissionGuard],
        loadChildren: () => import('./views/pages/bookings/bookings.module').then(m => m.BookingsModule),
        // data: {permission: ''}
      },
      {
        path: 'profile',
        // canActivate: [PermissionGuard],
        loadChildren: () => import('./views/pages/profile/profile.module').then(m => m.ProfileModule),
        // data: {permission: ''}
      },
    ]
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
