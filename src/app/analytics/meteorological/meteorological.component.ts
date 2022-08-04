import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-meteorological',
  templateUrl: './meteorological.component.html',
})
export class MeteorologicalComponent implements OnInit {

  title = 'googlechart';  
  type = ChartType.LineChart  
  data = [  
     ['Name1', 5.0],  
     ['Name2', 36.8],  
     ['Name3', 42.8],  
     ['Name4', 18.5],  
     ['Name5', 16.2]  
  ];  
  columnNames = ['Name', 'Percentage'];  
  options = {
    hAxis: {
      title: 'Time'
    },
    vAxis: {
      title: 'Popularity'
    },
    chartArea: {
    },
    legend: {
      position: 'top'
    },
    width: '1280',
    height: '300'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
