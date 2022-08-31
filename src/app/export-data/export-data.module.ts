import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ExportDataComponent } from './export-data.component';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [{ path: '', component: SidebarComponent, children:[
  {
    path:'',
    component:ExportDataComponent
  }
] }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ExportDataModule { }
