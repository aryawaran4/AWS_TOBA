import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.services';

const DashboardCardValue = [
  { 'label': 'Rainfall', 'unit': 'mm', 'value': '0.02' },
  { 'label': 'Air Temp', 'unit': 'C', 'value': '29' },
  { 'label': 'Humidity', 'unit': '%', 'value': '75' },
  { 'label': 'Wind Direction', 'unit': 'degrees', 'value': '240' },
  { 'label': 'Water Temp', 'unit': 'C', 'value': '25' },
  { 'label': 'Water Level', 'unit': 'm', 'value': '1.8' },
  { 'label': 'Radiation', 'unit': 'W/m', 'value': '600' },
  { 'label': 'Wind Speed', 'unit': 'Knot', 'value': '15' }
]

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  dashboardCard = DashboardCardValue

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  // lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1, 1)).toISOString()

  // stationLocationForm = new FormGroup({
  //   id_aws: new FormControl(this.router.url.replace(/\D/g, "")),
  //   start_datetime: new FormControl(this.lastMonth.replace('T', ' ').split(".")[0]),
  //   end_datetime: new FormControl(new Date().toISOString().replace('T', ' ').split(".")[0])
  // })    

  constructor(private ss: SharedService, private router:Router,) { 
  }

  ngOnInit(): void { 
    this.getDashboardData()    
  }

  getDashboardData(){
    this.ss.dashboardData().subscribe()
  }

}
