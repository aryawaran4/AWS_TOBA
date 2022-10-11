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

  LegendPosition : any = 'below'

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

  perHours = [
    {
      "name": "Water Level",
      'series' : [ { "name" : '', 'value': 0.0 } ]
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
  lastObj!: TobaDataType

  waterLvlData: TobaDataType[] = []
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
          this.waterLvlData = res.data          

          var test = res.data
          test.map( (e: { waktu: any; waterlevel:any }) => {
            var waterHours = new Date(e.waktu).toTimeString().slice(0, 8)
            this.perHours[0].series.push({
              name : waterHours,
              value : e.waterlevel
            })
          })          

          // this.waterLvlData.forEach(e => {
          //   this.perHour[0].series.forEach( (series) => {
          //     if(e.waktu.includes(series.name)){
          //       series.value = parseFloat(e.waterlevel) 
          //     }
          //   } )
          // });

          // this.perHour.forEach( (Obj, i) => {
          //   let arrData = Object.values(Obj)
          //   this.waterData.push(arrData)
          // })

          this.chartData = [...this.perHours]

          // console.log(this.perHours);          
          
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
