import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbDropdownModule, NgbDatepickerModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";

import { UsersComponent } from './users.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { PermissionGuard } from 'src/app/core/guard/permission.guard';
import { AppUsersComponent } from './app-users/app-users.component';
import { SystemUsersComponent } from './system-users/system-users.component';
import { HospitalUsersComponent } from './hospital-users/hospital-users.component';
import { AmbulanceCrewMembersComponent } from './ambulance-crew-members/ambulance-crew-members.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    pathMatch: 'full'
  },
  {
    path: 'system-users',
    canActivate: [PermissionGuard],
    component: SystemUsersComponent,
    data: { permission: 'systemUsers.view' },
  },
  {
    path: 'app-users',
    canActivate: [PermissionGuard],
    component: AppUsersComponent,
    data: { permission: 'appUsers.view' },
  },
  {
    path: 'hospital-users',
    canActivate: [PermissionGuard],
    component: HospitalUsersComponent,
    data: { permission: 'hospitalUsers.view' },
  },
  {
    path: 'ambulance-crew-members',
    canActivate: [PermissionGuard],
    component: AmbulanceCrewMembersComponent,
    data: { permission: 'ambulanceCrewMembers.view' },
  },
]

@NgModule({
  declarations: [
    UsersComponent,
    SystemUsersComponent,
    HospitalUsersComponent,
    AppUsersComponent,
    AmbulanceCrewMembersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeatherIconModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    NgSelectModule,
    NgbPaginationModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbDropdownModule,
    NgSelectModule,
    FormsModule,
    DropzoneModule,
    SweetAlert2Module.forRoot(),
    NzTreeViewModule,
    NzTreeSelectModule,
    NgxDatatableModule
  ]
})
export class UsersModule { }
