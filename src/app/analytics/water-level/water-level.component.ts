import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TobaType, TobaDataType } from 'src/app/shared/data.type';
import { SharedService } from 'src/app/shared/shared.services';

@Component({
  selector: 'app-water-level',
  templateUrl: './water-level.component.html',
})
export class WaterLevelComponent implements OnInit {

  title = 'Water Level Real Time';  

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Waktu';
  yAxisLabel: string = 'Water Level';
  timeline: boolean = true;

  //Collecting data from 03:00 because the data collection at API at 03:00 too
  perHour = [
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
    }
  ]

  chartData: any

  loading = false
  urlStatus!: boolean;

  rainfall!: string
  airTemp!: string
  preassure!: string
  windSpeed!: string  
  time!: string

  waterLvlData: TobaDataType[] = []
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
          this.waterLvlData = res.data
          this.waterLvlData.forEach(e => {
            this.perHour[0].series.forEach( (series) => {
              if(e.waktu.includes(series.name)){
                series.value = parseFloat(e.waterlevel) 
              }
            } )
          });

          // this.perHour.forEach( (Obj, i) => {
          //   let arrData = Object.values(Obj)
          //   this.waterData.push(arrData)
          // })

          this.chartData = [...this.perHour]

          console.log(this.perHour);          
          
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
