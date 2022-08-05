import { Component, OnInit } from '@angular/core';

const DeviceDescription = [
  { name: 'Name', value: 'AWS10002' },
  { name: 'Network ID', value: 'WL' },
  { name: 'Station Type', value: 'AWS-WL' },
  { name: 'Lat/Lon', value: '-6.781121 / 105.50303' },
  { name: 'Location', value: 'Water Level Ujung Kulon' },
  { name: 'Sensor Type 1', value: 'Water Level Ujung Kulon' },
  { name: 'Call Sign I / II', value: '10000000009 / 10002' },
  { name: 'Datum (LAT/MSL/HAT)', value: '1.44 m / 1.72 m / 2.06 m' },
]

const ActivityReport = [
  { name: 'Sampling Period', value: '60 second(s)' },
  { name: 'Last Data', value: '2021-12-13 04:30:35' },
  { name: 'Received', value: '2021-12-13 04:31:27' },
  { name: 'Data Latency', value: '1.47 minutes' },
  { name: 'Feed Latency', value: '16.69 seconds' },
  { name: 'Diff.', value: '52.0 seconds' },
  { name: 'Reported', value: '2021-12-13 04:32:03' },
]

@Component({
  selector: 'app-station-info',
  templateUrl: './station-info.component.html',
})
export class StationInfoComponent implements OnInit {

  deviceDescription = DeviceDescription
  activityReport = ActivityReport

  constructor() { }

  ngOnInit(): void {
  }

}
