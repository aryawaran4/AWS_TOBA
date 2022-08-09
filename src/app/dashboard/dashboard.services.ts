
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormTobaType, TobaDataType, url } from '../shared/data.type';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {    

    url = url

    constructor(private http: HttpClient) {}

    postDashboard(formValue: any){
        return this.http.post<any>(this.url, formValue)
    }

}