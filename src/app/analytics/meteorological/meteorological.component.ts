import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LegendPosition } from '@swimlane/ngx-charts';
import { TobaDataType } from 'src/app/shared/data.type';
import { SharedService } from 'src/app/shared/shared.services';

@Component({
  selector: 'app-meteorological',
  templateUrl: './meteorological.component.html',
})
export class MeteorologicalComponent implements OnInit {

  titleWindChart = 'Water Level Real Time';  

  LegendPosition : any = 'below'

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;

  xLabel: string = 'Waktu';
  yWind: string = 'Speed Knots';
  yTemp: string = 'Degree (F)';

  //Collecting data from 03:00 because the data collection at API at 03:00 too
  windPerHour = [
    {
      "name": "Wind Direction",
      'series' : [ { "name" : '', 'value': 0.0 } ]
    },
    {
      "name": "Wind Speed",
      'series' : [ { "name" : '', 'value': 0.0 } ]
    }
  ]

  tempPerHour = [
    {
      "name": "Water Level",
      'series' : [ { "name" : '', 'value': 0.0 } ]
    },
    {
      "name": "Water Temperature",
      'series' : [ { "name" : '', 'value': 0.0 } ]
    }
  ]

  chartDataWind: any
  chartDataTemp: any

  loading = false
  urlStatus!: boolean;

  rainfall!: string
  airTemp!: string
  preassure!: string
  windSpeed!: string  
  time!: string
  lastObj!: TobaDataType

  windData: TobaDataType[] = []
  tempData: TobaDataType[]= []
  waterData: any[] = []

  constructor(private ss: SharedService, private router:Router) { 
    router.events.subscribe((x: any) => {
      // only interested in the NavigationEnd type of event
      if (!(x instanceof NavigationEnd)) {
        return;
      }

      if(/^\d+$/.test(this.router.url.slice(-1)) === true){
        this.urlStatus = true
      }else{
        this.urlStatus = false
      }

      console.log(this.urlStatus);
      

      this.loading = true
      this.ss.getTobaData().subscribe(
        res=>{
          this.lastObj = res.data[res.data.length - 1] 
          this.time = this.lastObj.waktu
          this.windData = res.data         
          this.windData.map((e) => {      
            var windHours = new Date(e.waktu).toTimeString().slice(0, 8)
            this.windPerHour[0].series.push({
                name : windHours,
                value : parseFloat(e.winddir)
            })
            this.windPerHour[1].series.push({
              name : windHours,
              value : parseFloat(e.windspeed)
          })
          });

          this.tempData = res.data
          this.tempData.map(e => {
            var tempHours = new Date(e.waktu).toTimeString().slice(0, 8)
            this.tempPerHour[0].series.push({
              name : tempHours,
              value : parseFloat(e.waterlevel)
            })
            this.tempPerHour[1].series.push({
              name : tempHours,
              value : parseFloat(e.watertemp)
            })
          });

          this.chartDataWind = [...this.windPerHour]
          this.chartDataTemp = [...this.tempPerHour]

          console.log(this.chartDataWind);          
          console.log(
            // this.ss.arrRuleDate.forEach(e=> {
            //   console.log(e)
            //   console.log('2022-8-11 23:59:'.includes(e));                          
            // })
            );          
          
          this.loading = false
        },
        err=>{
          alert('error, something went wrong')
          this.loading = false
        }
      )
      
    });
  }

  ngOnInit(): void {
  }

}
