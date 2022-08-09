
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
        return this.http.post<any>('/api/v1/data/aws?key=ca129115a7c7bf35bfc0634fa8ade63d', formValue)
    }

}