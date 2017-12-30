import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { DashboardService } from './services/dashboard.service';
import {MapService}           from '../shared/components/map/services/map.service';

@Component({

  selector: 'app-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService,MapService],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent{
  data:String[]=[];
  private mapData:Array<Object> = null;
  constructor(private dashboardService: DashboardService,private mapService:MapService){
    this.dashboardService.getData().then((result)=>{
      this.data = result;
    }).catch((e)=>{
      console.log(e);
    });
    this.mapData = mapService.getData();
  }
}
