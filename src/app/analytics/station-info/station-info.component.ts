import { Component, OnInit } from '@angular/core';

const DeviceDescription = [
  { name: 'Name', value: 'AWS10002' },
  { name: 'Network ID', value: 'AWS10002' },
  { name: 'Station Type', value: 'AWS10002' },
  { name: 'Lat/Lon', value: 'AWS10002' },
  { name: 'Location', value: 'AWS10002' },
  { name: 'Sensor Type 1', value: 'AWS10002' },
  { name: 'Call Sign I / II', value: 'AWS10002' },
  { name: 'Datum (LAT/MSL/HAT)', value: 'AWS10002' },
]

const ActivityReport = [
  { name: 'Sampling Period', value: 'AWS10002' },
  { name: 'Last Data', value: 'AWS10002' },
  { name: 'Received', value: 'AWS10002' },
  { name: 'Data Latency', value: 'AWS10002' },
  { name: 'Feed Latency', value: 'AWS10002' },
  { name: 'Diff.', value: 'AWS10002' },
  { name: 'Reported', value: 'AWS10002' },
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
