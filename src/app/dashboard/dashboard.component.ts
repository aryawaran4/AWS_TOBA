import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { NavigationEnd, Router } from '@angular/router';
import { TobaDataType, TobaType } from '../shared/data.type';
import { SharedService } from '../shared/shared.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
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

  rainfall!: string
  airTemp!: string
  humidity!: string
  windDirection!: string
  waterTemp!: string
  waterLvl!: string
  radiation!: string
  windSpeed!: string  
  time!: string

  getTobaData!: TobaType
  lastObj!: TobaDataType

  // lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1, 1)).toISOString()

  // stationLocationForm = new FormGroup({
  //   id_aws: new FormControl(this.router.url.replace(/\D/g, "")),
  //   start_datetime: new FormControl(this.lastMonth.replace('T', ' ').split(".")[0]),
  //   end_datetime: new FormControl(new Date().toISOString().replace('T', ' ').split(".")[0])
  // })    

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
          this.humidity = this.lastObj.rh
          this.windDirection = this.lastObj.winddir
          this.waterTemp = this.lastObj.watertemp
          this.waterLvl = this.lastObj.waterlevel
          this.radiation = this.lastObj.solrad
          this.windSpeed = this.lastObj.windspeed
          this.time = this.lastObj.waktu
          const arrData = [ this.rainfall, this.airTemp, this.humidity, this.windDirection, this.waterTemp, this.waterLvl, this.radiation, this.windSpeed ]
          this.dashboardCard.forEach((element, i) => {
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
