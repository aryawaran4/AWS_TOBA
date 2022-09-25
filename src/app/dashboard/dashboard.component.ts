import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { NavigationEnd, Router } from '@angular/router';
import { TobaDataType, TobaType } from '../shared/data.type';
import { SharedService } from '../shared/shared.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('1000ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('1000ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class DashboardComponent implements OnInit {

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  urlStatus!: boolean;
  loading: boolean = false

  dashboardCard = [
    { label: 'Rainfall', unit: 'mm', value :''},
    { label: 'Air Temp', unit: 'C', value :''},
    { label: 'Humidity', unit: '%', value :''},
    { label: 'Wind Direction', unit: 'degrees', value :''},
    { label: 'Water Temp', unit: 'C', value :''},
    { label: 'Water Level', unit: 'm' , value :''},
    { label: 'Radiation', unit: 'W/m' , value :''},
    { label: 'Wind Speed', unit: 'Knot', value :'' }
  ]

  stationName!: string
  rainfall!: string
  airTemp!: string
  humidity!: string
  windDirection!: string
  waterTemp!: string
  waterLvl!: string
  radiation!: string
  windSpeed!: string  
  time!: string

  windCheck!: number;

  getTobaData!: TobaType
  lastObj!: TobaDataType

  // lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1, 1)).toISOString()

  // stationLocationForm = new FormGroup({
  //   id_aws: new FormControl(this.router.url.replace(/\D/g, "")),
  //   start_datetime: new FormControl(this.lastMonth.replace('T', ' ').split(".")[0]),
  //   end_datetime: new FormControl(new Date().toISOString().replace('T', ' ').split(".")[0])
  // })    

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

      this.loading = true
      if(this.urlStatus === true){
        this.ss.getTobaLatestData().subscribe(
          res=>{
            var stationId = res.id_aws
            if(stationId === '3000000040'){
              this.stationName = 'AWS Toba 1-Pel.Ajibata'
            }else if(stationId === '3000000041'){
              this.stationName = 'AWS Toba 2-Pel.Ambarita'
            }else if(stationId === '3000000042'){
              this.stationName = 'AWS Toba 3-Pel.Simanindo'
            }else if(stationId === '3000000044'){
              this.stationName = 'AWS Toba 5-Pel. Sipinggan'
            }else if(stationId === '3000000045'){
              this.stationName = 'AWS Toba 6-Pel. Balige'
            } else{
              return
            }
            this.lastObj = res.data[res.data.length - 1]    
            this.rainfall = this.lastObj.rain
            this.airTemp = this.lastObj.temp
            this.humidity = this.lastObj.rh
            this.windDirection = this.lastObj.winddir
            this.waterTemp = this.lastObj.watertemp
            this.waterLvl = this.lastObj.waterlevel
            this.radiation = this.lastObj.solrad
            this.windSpeed = this.lastObj.windspeed
            this.time = this.lastObj.waktu
            this.windCheck = parseFloat(this.windSpeed)
            const arrData = [ this.rainfall, this.airTemp, this.humidity, this.windDirection, this.waterTemp, this.waterLvl, this.radiation, this.windSpeed ]
            this.dashboardCard.forEach((element, i) => {
              element.value = arrData[i]
            });
            this.loading = false
          },
          err=>{
            alert('error, something went wrong')
            this.loading = false
          }
        )
      }
      
    });
  }

  ngOnInit(): void {  
  }
  
}
