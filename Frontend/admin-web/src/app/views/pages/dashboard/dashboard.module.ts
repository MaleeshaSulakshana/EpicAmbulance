import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";

import { DashboardComponent } from './dashboard.component';
import { PermissionGuard } from 'src/app/core/guard/permission.guard';

const routes: Routes = [
  {
    path: '',
    // canActivate: [PermissionGuard],
    component: DashboardComponent,
    // data: {permission: 'dashboard.view'},
  }
]

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeatherIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule
  ]
})
export class DashboardModule { }