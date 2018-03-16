import { Component, OnInit, Input } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {TimeZonesListService} from "./timeZonesList.service";


@Component({
  selector: 'timeZone-list',
  templateUrl: './timeZonesList.html',
  styleUrls: ['./timeZonesList.scss'],
  providers: [TimeZonesListService]
})

export class TimeZonesListComponent implements OnInit {

  @Input() selectedTimeZone;
  timeZones: Array<object> = [];
  selectedTime ;


  constructor(private timeZonesListService: TimeZonesListService){

    this.timeZonesListService.getTimeZones().subscribe((e)=>{
      e[0].forEach((tZ)=>{
        this.timeZones.push({id:tZ.TimeZoneID,name:tZ.DisplayName});
      });
    });

    console.log('::::', this.selectedTimeZone);
    this.selectedTime = this.timeZones.filter((res)=>res['id'] == this.selectedTimeZone );

  }

  ngOnInit(){


  }
}
