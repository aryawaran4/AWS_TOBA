import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.services';
import { Ajibata, Ambarita, Balige, Simanindo, Sipinggan } from './station-info.type';


@Component({
  selector: 'app-station-info',
  templateUrl: './station-info.component.html',
})
export class StationInfoComponent implements OnInit {

  balige = Balige
  sipinggan = Sipinggan
  simanindo = Simanindo
  ajibata = Ajibata
  ambarita = Ambarita

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
              this.coordinate = [2.65944444444444, 98.933333333333]
            }else if(stationId === '3000000041'){
              this.stationName = 'AWS-Pel.Ambarita'
              this.stationInfo = this.ambarita
              this.coordinate = [0,0]
            }else if(stationId === '3000000042'){
              this.stationName = 'AWS-Pel.Simanindo'
              this.stationInfo = this.simanindo
              this.coordinate = [2.7544444444444, 98.745555555556]
            }else if(stationId === '3000000044'){
              this.stationName = 'AWS-Pel. Sipinggan'
              this.stationInfo = this.sipinggan
              this.coordinate = [2.4346111111111, 98.898055555555555556]
            }else if(stationId === '3000000045'){
              this.stationName = 'AWS-Pel. Balige'
              this.stationInfo = this.balige
              this.coordinate = [2.3775, 99.06222222222]
            } else {
              return
            }
            this.loading = false
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
