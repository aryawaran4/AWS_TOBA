import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
