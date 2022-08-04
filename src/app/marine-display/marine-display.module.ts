import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarineDisplayComponent } from './marine-display.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';

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
    MatSlideToggleModule,
    MatIconModule
  ]
})
export class MarineDisplayModule { }
