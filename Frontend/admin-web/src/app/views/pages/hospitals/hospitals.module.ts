import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbDropdownModule, NgbDatepickerModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";

import { HospitalsComponent } from './hospitals.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { PermissionGuard } from 'src/app/core/guard/permission.guard';

import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

const routes: Routes = [
  {
    path: '',
    canActivate: [PermissionGuard],
    component: HospitalsComponent,
    data: { permission: 'hospitals.view' },
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [HospitalsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeatherIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    NgSelectModule,
    NgxDatatableModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ]
})
export class HospitalsModule { }
