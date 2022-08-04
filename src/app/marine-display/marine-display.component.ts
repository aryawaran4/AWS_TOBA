import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

const marineCardValue = [
  { 'label': 'Rainfall', 'unit': 'mm', 'value': '0.02' },
  { 'label': 'Air Temp', 'unit': 'C', 'value': '29' },
  { 'label': 'Preassure', 'unit': 'mbar', 'value': '1000' },
  { 'label': 'Wind Speed', 'unit': 'Knot', 'value': '1.8' }
]

@Component({
  selector: 'app-marine-display',
  templateUrl: './marine-display.component.html',
})
export class MarineDisplayComponent implements OnInit {

  marineCard = marineCardValue

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  constructor() { }

  ngOnInit(): void {
  }

}
