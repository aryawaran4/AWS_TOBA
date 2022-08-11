
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class SharedService {    

    url = '/api/v1/data/aws?key=ca129115a7c7bf35bfc0634fa8ade63d'

    //Get month and last month type Date
    Ldate = new Date(new Date().setDate(new Date().getDate()))
    Tdate = new Date(new Date().setDate(new Date().getDate() + 1))

    //Get month and last month type Number
    lastYear = this.Ldate.getFullYear();
    thisYear = this.Tdate.getFullYear();

    //Get month and last month type Number
    lastDate = this.Ldate.getDate();
    thisDate = this.Tdate.getDate();

    //Get month and last month type Number
    lastMonth = this.Ldate.getMonth() + 1
    thisMonth = this.Tdate.getMonth() + 1

    //For parsing 1-9 to 01-09
    parseDate!: string;
    parseLastDate!: string

    parseMonth!: string;
    parseLastMonth!: string
    //------------------------

    ruleDateTime!: string
    arrRuleDate!: any[]

    start_date! : string;
    end_date! : string

    constructor(private router:Router, private http:HttpClient) { 
        if (this.thisDate < 10) {
          this.parseDate = '0' + this.thisDate;
        }else{
          this.parseDate = this.thisDate.toString()
        }
    
        if (this.lastDate < 10) {
          this.parseDate = '0' + this.lastDate;
        }else{
          this.parseDate = this.lastDate.toString()
        }
    
        if (this.thisMonth < 10) {
          this.parseMonth = '0' + this.thisMonth;
        }else{
          this.parseMonth = this.thisMonth.toString()
        }

        if (this.lastMonth < 10) {
          this.parseMonth = '0' + this.lastMonth;
        }else{
          this.parseMonth = this.lastMonth.toString()
        }
    
        this.start_date = this.lastYear + '-' + this.lastMonth + '-' + this.lastDate + ' ' + '00:00:00'
        this.end_date = this.thisYear + '-' + this.thisMonth + '-' + this.thisDate + ' ' + '00:00:00'

        //Array of date & time to rule the output in graph
        // this.ruleDateTime = this.lastYear + '-' + this.lastMonth + '-' + this.lastDate + ' '
        // this.arrRuleDate = [
        //   this.ruleDateTime + '01:00:', this.ruleDateTime + '02:00:', this.ruleDateTime + '03:00:', this.ruleDateTime + '04:00:', this.ruleDateTime + '05:00:', this.ruleDateTime + '06:00:',
        //   this.ruleDateTime + '07:00:', this.ruleDateTime + '08:00:', this.ruleDateTime + '09:00:', this.ruleDateTime + '10:00:', this.ruleDateTime + '11:00:', this.ruleDateTime + '12:00:',
        //   this.ruleDateTime + '13:00:', this.ruleDateTime + '14:00:', this.ruleDateTime + '15:00:', this.ruleDateTime + '16:00:', this.ruleDateTime + '17:00:', this.ruleDateTime + '18:00:',
        //   this.ruleDateTime + '19:00:', this.ruleDateTime + '20:00:', this.ruleDateTime + '21:00:', this.ruleDateTime + '22:00:', this.ruleDateTime + '23:00:', this.ruleDateTime + '23:59:'          
        // ]
        //------------------------------------------------        
    }

    getTobaData(){
        let formToba = new FormGroup({
          id_aws: new FormControl(this.router.url.replace(/\D/g, "")),
          start_datetime: new FormControl(this.start_date),
          end_datetime: new FormControl(this.end_date)
        })                  
        return this.http.post<any>(this.url, formToba.value)
    }

}