import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarineDisplayComponent } from './marine-display.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';

const routes: Routes = [{ path: '', component: SidebarComponent, children:[
  {
    path:'',
    component:MarineDisplayComponent
  }
] }];

@NgModule({
  declarations: [MarineDisplayComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class MarineDisplayModule { }
