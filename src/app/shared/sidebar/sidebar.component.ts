import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { SharedService } from '../shared.services';
import { SnackbarService } from '../snackbar/snackbar.service';
import { navLinks } from './sidebar-links';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`
    ::ng-deep .mat-form-field-appearance-outline .mat-form-field-outline {
      background-color: white;
      border-radius: 5px;
    }

    .hover-nav-item{
      --tw-bg-opacity: 1;
      background-color: rgb(42 48 113 / var(--tw-bg-opacity));
      --tw-text-opacity: 1;
      color: rgb(255 255 255 / var(--tw-text-opacity));
    }
  `]
})
export class SidebarComponent implements OnInit {

  public readonly links = navLinks;
  currentUrl! : string;
  title = '';
  profileName!:string;

  id : any

  stationFilter = new FormGroup({
    id_aws: new FormControl('')
  })

  urlStatus!: boolean;
  optInitial = '';

  defaultStation!: string
  previousUrl!: string

  constructor(
    private ss: SharedService,
    private router:Router,
    private snackbar: SnackbarService,
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
  }

  ngOnInit(): void {
    this.currentUrl = this.router.url
    
    this.getMeInfo();
  }

  newPageWithParam(url:string){
    if(this.defaultStation !== undefined){
      this.router.navigate([url],{queryParams: {id: this.defaultStation }})
    }else if(this.defaultStation === undefined){
      this.router.navigate([url])
    }
  }

  appendParamsUrl(){
    this.router.navigate([], {
      queryParams: {
        id : this.stationFilter.value.id_aws 
      },
      queryParamsHandling: 'merge',
    });    
  }  

  getMeInfo(){
    // this.auth.getMe().subscribe(
    //   res=>{
    //     this.profileName = res.name
    //   }
    // )
  }

  logout(){
    // this.auth.logOut().subscribe(
    //   res =>{
    //     localStorage.clear();
        this.router.navigate(['/']);
    //   },
    //   err =>{
    //     this.snackbar.openSnackBar("Error something wrong", "close")
    //   }
    // )    
  }

}
