import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { NavigationEnd, Router } from '@angular/router';
import { TobaType, TobaDataType } from '../shared/data.type';
import { SharedService } from '../shared/shared.services';

@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
})
export class ExportDataComponent implements OnInit {
  
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  urlStatus!: boolean;
  loading: boolean = false

  stationName!: string

  windSpeed!: string  
  time!: string

  startDate!: string
  endDate!: string

  windCheck!: number;

  getTobaData!: TobaType
  tobaData!: TobaDataType[]

  constructor(private ss:SharedService, private router:Router) {
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
          },
          err=>{
            alert('error, something went wrong')
            this.loading = false
          }
        )
      }
      

      this.loading = true
      this.ss.getTobaData().subscribe(
        res=>{
          this.startDate = new Date(res.start_datetime).toDateString()
          this.endDate = new Date(res.end_datetime).toDateString()
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

  download(){
    this.ss.getTobaData().subscribe(
      res=>{        
        this.ss.downloadFile(res.data, 'toba_report')    
      }
    )
  }

}
