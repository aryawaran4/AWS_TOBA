import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router, NavigationEnd } from '@angular/router';
import { TobaDataType, TobaType } from '../shared/data.type';
import { SharedService } from '../shared/shared.services';

const marineCardValue = [
  { 'label': 'Rainfall', 'unit': 'mm', 'value': '0.02' },
  { 'label': 'Air Temp', 'unit': 'C', 'value': '29' },
  { 'label': 'Preassure', 'unit': 'mbar', 'value': '1000' },
  { 'label': 'Wind Speed', 'unit': 'Knot', 'value': '1.8' }
]

@Component({
  selector: 'app-marine-display',
  templateUrl: './marine-display.component.html',
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
export class MarineDisplayComponent implements OnInit {

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  urlStatus!: boolean;
  loading: boolean = false

  marineCard = [
    { label: 'Rainfall', unit: 'mm', value :''},
    { label: 'Air Temp', unit: 'C', value :''},
    { label: 'Preassure', unit: 'mbar', value :''},
    { label: 'Wind Speed', unit: 'Knot', value :'' }
  ]

  stationName!: string
  rainfall!: string
  airTemp!: string
  preassure!: string
  windSpeed!: string  
  windDirection!: string
  windCheck!: number
  time!: string

  getTobaData!: TobaType
  lastObj!: TobaDataType

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
        this.ss.getTobaData().subscribe(
          res=>{
            var stationId = res.id_aws
            if(stationId === '3000000040'){
              this.stationName = 'AWS-Pel.Ajibata'
            }else if(stationId === '3000000041'){
              this.stationName = 'AWS-Pel.Ambarita'
            }else if(stationId === '3000000042'){
              this.stationName = 'AWS-Pel.Simanindo'
            }else if(stationId === '3000000044'){
              this.stationName = 'AWS-Pel. Sipinggan'
            }else if(stationId === '3000000045'){
              this.stationName = 'AWS-Pel. Balige'
            } else {
              return
            }
            this.lastObj = res.data[res.data.length - 1]    
            this.rainfall = this.lastObj.rain
            this.airTemp = this.lastObj.temp
            this.preassure = this.lastObj.pressure
            this.windSpeed = this.lastObj.windspeed
            this.windDirection = this.lastObj.winddir
            this.time = this.lastObj.waktu
            this.windCheck = parseFloat(this.windSpeed)
            const arrData = [ this.rainfall, this.airTemp, this.preassure, this.windSpeed ]
            this.marineCard.forEach((element, i) => {
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
