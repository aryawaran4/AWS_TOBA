import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TobaDataType } from '../shared/data.type';
import { SharedService } from '../shared/shared.services';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
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
export class AnalyticsComponent implements OnInit {

  windCheck!: number;
  lastObj!: TobaDataType

  navLinks: any[];
  activeLinkIndex = -1;

  urlStatus!: boolean;
  optInitial = '';
  defaultStation!: string
  previousUrl!: string
  constructor(private ss: SharedService, private router: Router) {
    this.navLinks = [
      {
          label: 'Station Info',
          link: '/analytics/station-info',
          index: 0
      }, {
          label: 'Water Level',
          link: '/analytics/water-level',
          index: 1
      }, {
          label: 'Meteorological Obs',
          link: '/analytics/meteorological-obs',
          index: 2
      }, 
  ];

  router.events.subscribe((x: any) => {
    // only interested in the NavigationEnd type of event
    if (!(x instanceof NavigationEnd)) {
      return;
    }

    if(/^\d+$/.test(this.router.url.slice(-1)) === true){
      this.urlStatus = true
    }else{
      this.urlStatus = false
      this.optInitial = ''
    }

    if(this.urlStatus === true){
      this.ss.getTobaData().subscribe(
        res=>{
          this.defaultStation = res.id_aws          
        },
        err=>{
          alert('error, something went wrong')
        }
      )
    }
  });

    this.ss.getTobaData().subscribe(
      res=>{
        this.lastObj = res.data[res.data.length - 1]  
        this.windCheck = parseFloat(this.lastObj.windspeed)
      },
      err=>{
        alert('error, something went wrong')
      }
      )
   }

  ngOnInit(): void {
  this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
  }

  newPageWithParam(url:string){
    if(this.defaultStation !== undefined){
      this.router.navigate([url],{queryParams: {id: this.defaultStation }})
    }else if(this.defaultStation === undefined){
      this.router.navigate([url])
    }
  }

}
