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

  rainfall!: string
  airTemp!: string
  preassure!: string
  windSpeed!: string  
  windCheck!: number
  time!: string

  getTobaData!: TobaType
  lastObj!: TobaDataType

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
          this.rainfall = this.lastObj.rain
          this.airTemp = this.lastObj.temp
          this.preassure = this.lastObj.pressure
          this.windSpeed = this.lastObj.windspeed
          this.time = this.lastObj.waktu
          this.windCheck = parseFloat(this.windSpeed)
          const arrData = [ this.rainfall, this.airTemp, this.preassure, this.windSpeed ]
          this.marineCard.forEach((element, i) => {
            element.value = arrData[i]
          });
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
