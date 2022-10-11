import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.services';
import { Ajibata, Balige, Simanindo, Sipinggan } from './station-info.type';

// const ActivityReport = [
//   { name: 'Sampling Period', value: '60 second(s)' },
//   { name: 'Last Data', value: '2021-12-13 04:30:35' },
//   { name: 'Received', value: '2021-12-13 04:31:27' },
//   { name: 'Data Latency', value: '1.47 minutes' },
//   { name: 'Feed Latency', value: '16.69 seconds' },
//   { name: 'Diff.', value: '52.0 seconds' },
//   { name: 'Reported', value: '2021-12-13 04:32:03' },
// ]

@Component({
  selector: 'app-station-info',
  templateUrl: './station-info.component.html',
})
export class StationInfoComponent implements OnInit {

  balige = Balige
  sipinggan = Sipinggan
  simanindo = Simanindo
  ajibata = Ajibata

  stationInfo: any
  stationName!: string
  urlStatus!: boolean
  loading = false

  coordinate = [0, 0];
  
  constructor(
    private router: Router,
    private ss: SharedService
  ) {
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
        this.loading = true
        this.ss.getTobaData().subscribe(
          res=>{
            var stationId = res.id_aws
            if(stationId === '3000000040'){
              this.stationName = 'AWS-Pel.Ajibata'
              this.stationInfo = this.ajibata
              console.log(this.stationInfo);
              
            }else if(stationId === '3000000041'){
              this.stationName = 'AWS-Pel.Ambarita'
            }else if(stationId === '3000000042'){
              this.stationName = 'AWS-Pel.Simanindo'
              this.stationInfo = this.simanindo
              console.log(this.stationInfo);
            }else if(stationId === '3000000044'){
              this.stationName = 'AWS-Pel. Sipinggan'
              this.stationInfo = this.sipinggan
              console.log(this.stationInfo);
            }else if(stationId === '3000000045'){
              this.stationName = 'AWS-Pel. Balige'
              this.stationInfo = this.balige
              console.log(this.stationInfo);
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
      
    })
   }

  ngOnInit(): void {
  }

}
