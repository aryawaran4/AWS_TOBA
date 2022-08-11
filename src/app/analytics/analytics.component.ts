import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(private ss: SharedService, private router: Router) {
    this.navLinks = [
      {
          label: 'Station Info',
          link: './station-info',
          index: 0
      }, {
          label: 'Water Level',
          link: './water-level',
          index: 1
      }, {
          label: 'Meteorological Obs',
          link: './meteorological-obs',
          index: 2
      }, 
  ];

    this.ss.getTobaData().subscribe(
      res=>{
        this.lastObj = res.data[res.data.length - 1]  
        this.windCheck = parseFloat(this.lastObj.windspeed)
      },
      err=>{
        alert(err)
      }
      )
   }

  ngOnInit(): void {
  this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
  }

}
