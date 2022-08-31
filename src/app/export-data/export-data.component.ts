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

  windSpeed!: string  
  time!: string

  startDate!: string
  endDate!: string

  windCheck!: number;

  getTobaData!: TobaType
  tobaData!: TobaDataType[]

  constructor(private ss:SharedService, private router:Router) {
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
