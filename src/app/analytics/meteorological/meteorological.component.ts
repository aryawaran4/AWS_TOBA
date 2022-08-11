import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TobaDataType } from 'src/app/shared/data.type';
import { SharedService } from 'src/app/shared/shared.services';

@Component({
  selector: 'app-meteorological',
  templateUrl: './meteorological.component.html',
})
export class MeteorologicalComponent implements OnInit {

  titleWindChart = 'Water Level Real Time';  

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
    {"name" : "Wind Direction",
    "series" : [
      {"name" : '03:00:00', "value": 0},
      {"name" : '04:00:00', "value": 0},
      {"name" : '05:00:00', "value": 0},
      {"name" : '06:00:00', "value": 0},
      {"name" : '07:00:00', "value": 0},
      {"name" : '08:00:00', "value": 0},
      {"name" : '09:00:00', "value": 0},
      {"name" : '10:00:00', "value": 0},
      {"name" : '11:00:00', "value": 0},
      {"name" : '12:00:00', "value": 0},
      {"name" : '13:00:00', "value": 0},
      {"name" : '14:00:00', "value": 0},
      {"name" : '15:00:00', "value": 0},
      {"name" : '16:00:00', "value": 0},
      {"name" : '17:00:00', "value": 0},
      {"name" : '18:00:00', "value": 0},
      {"name" : '19:00:00', "value": 0},
      {"name" : '20:00:00', "value": 0},
      {"name" : '21:00:00', "value": 0},
      {"name" : '22:00:00', "value": 0},
      {"name" : '23:00:00', "value": 0},
      {"name" : '23:59:00', "value": 0}
     ]
    },
    {"name" : "Wind Speed",
    "series" : [
      {"name" : '03:00:00', "value": 0},
      {"name" : '04:00:00', "value": 0},
      {"name" : '05:00:00', "value": 0},
      {"name" : '06:00:00', "value": 0},
      {"name" : '07:00:00', "value": 0},
      {"name" : '08:00:00', "value": 0},
      {"name" : '09:00:00', "value": 0},
      {"name" : '10:00:00', "value": 0},
      {"name" : '11:00:00', "value": 0},
      {"name" : '12:00:00', "value": 0},
      {"name" : '13:00:00', "value": 0},
      {"name" : '14:00:00', "value": 0},
      {"name" : '15:00:00', "value": 0},
      {"name" : '16:00:00', "value": 0},
      {"name" : '17:00:00', "value": 0},
      {"name" : '18:00:00', "value": 0},
      {"name" : '19:00:00', "value": 0},
      {"name" : '20:00:00', "value": 0},
      {"name" : '21:00:00', "value": 0},
      {"name" : '22:00:00', "value": 0},
      {"name" : '23:00:00', "value": 0},
      {"name" : '23:59:00', "value": 0}
     ]
    }
  ]

  tempPerHour = [
    {"name" : "Water Level",
    "series" : [
     {"name" : '03:00:00', "value": 0},
     {"name" : '04:00:00', "value": 0},
     {"name" : '05:00:00', "value": 0},
     {"name" : '06:00:00', "value": 0},
     {"name" : '07:00:00', "value": 0},
     {"name" : '08:00:00', "value": 0},
     {"name" : '09:00:00', "value": 0},
     {"name" : '10:00:00', "value": 0},
     {"name" : '11:00:00', "value": 0},
     {"name" : '12:00:00', "value": 0},
     {"name" : '13:00:00', "value": 0},
     {"name" : '14:00:00', "value": 0},
     {"name" : '15:00:00', "value": 0},
     {"name" : '16:00:00', "value": 0},
     {"name" : '17:00:00', "value": 0},
     {"name" : '18:00:00', "value": 0},
     {"name" : '19:00:00', "value": 0},
     {"name" : '20:00:00', "value": 0},
     {"name" : '21:00:00', "value": 0},
     {"name" : '22:00:00', "value": 0},
     {"name" : '23:00:00', "value": 0},
     {"name" : '23:59:00', "value": 0}
    ]
    },
    {"name" : "Water Temperature",
    "series" : [
     {"name" : '03:00:00', "value": 0},
     {"name" : '04:00:00', "value": 0},
     {"name" : '05:00:00', "value": 0},
     {"name" : '06:00:00', "value": 0},
     {"name" : '07:00:00', "value": 0},
     {"name" : '08:00:00', "value": 0},
     {"name" : '09:00:00', "value": 0},
     {"name" : '10:00:00', "value": 0},
     {"name" : '11:00:00', "value": 0},
     {"name" : '12:00:00', "value": 0},
     {"name" : '13:00:00', "value": 0},
     {"name" : '14:00:00', "value": 0},
     {"name" : '15:00:00', "value": 0},
     {"name" : '16:00:00', "value": 0},
     {"name" : '17:00:00', "value": 0},
     {"name" : '18:00:00', "value": 0},
     {"name" : '19:00:00', "value": 0},
     {"name" : '20:00:00', "value": 0},
     {"name" : '21:00:00', "value": 0},
     {"name" : '22:00:00', "value": 0},
     {"name" : '23:00:00', "value": 0},
     {"name" : '23:59:00', "value": 0}
    ]
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
    router.events.subscribe(x => {
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
          this.windData.forEach((e) => {      
            this.windPerHour[0].series.forEach( (series) => {
              // this.ss.arrRuleDate.forEach( dateRule => {                
                if(e.waktu.includes(series.name)){
                  series.value = parseFloat(e.winddir) 
                }
              // } )
            } )
            this.windPerHour[1].series.forEach( (series) => {
              // this.ss.arrRuleDate.forEach( dateRule => {
                if(e.waktu.includes(series.name)){
                  series.value = parseFloat(e.windspeed) 
                }
              // } )
            } )
          });

          this.tempData = res.data
          this.tempData.forEach(e => {
            this.tempPerHour[0].series.forEach( (series) => {
              if(e.waktu.includes(series.name)){
                series.value = parseFloat(e.waterlevel) 
              }
            } )
            this.tempPerHour[1].series.forEach( (series) => {
              if(e.waktu.includes(series.name)){
                series.value = parseFloat(e.watertemp) 
              }
            } )
          });

          this.chartDataWind = [...this.windPerHour]
          this.chartDataTemp = [...this.tempPerHour]

          console.log(this.chartDataWind);          
          console.log(
            this.ss.arrRuleDate.forEach(e=> {
              console.log(e)
              console.log('2022-8-11 23:59:'.includes(e));                          
            })
            );          
          
          this.loading = false
        },
        err=>{
          alert(err)
          this.loading = false
        }
      )
      
    });
  }

  ngOnInit(): void {
  }

}
