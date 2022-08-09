import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: SidebarComponent, children:[
  {
    path:'',
    component:DashboardComponent
  }
] }];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSlideToggleModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
