import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent } from './analytics.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import { GoogleChartsModule } from 'angular-google-charts';
import { StationInfoComponent } from './station-info/station-info.component';
import { WaterLevelComponent } from './water-level/water-level.component';
import { MeteorologicalComponent } from './meteorological/meteorological.component';

const routes: Routes = [{ path: '', component: SidebarComponent, 
  children:[
      {
        path:'',
        component:AnalyticsComponent,
        children:[
          {
            path: 'station-info',
            component: StationInfoComponent
          },
          {
            path: 'water-level',
            component: WaterLevelComponent
          },
          {
            path: 'meteorological-obs',
            component: MeteorologicalComponent
          },    
        ]
      },
    ] 
  }];

@NgModule({
  declarations: [AnalyticsComponent, MeteorologicalComponent, StationInfoComponent, WaterLevelComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSlideToggleModule,
    MatIconModule,
    MatSidenavModule,

    GoogleChartsModule
  ]
})
export class AnalyticsModule { }
