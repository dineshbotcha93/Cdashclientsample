import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { DashboardService } from './services/dashboard.service';
import {MapService}           from '../shared/components/map/services/map.service';
import { MapConstants } from '../shared/components/map/constants/map.constants';
import {Router} from '@angular/router';

@Component({

  selector: 'app-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService,MapService],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent{
  data:String[]=[];
  private tileData = null;
  private mapConstants = MapConstants.STATUS;
  constructor(private dashboardService: DashboardService,private router:Router){
    this.tileData = dashboardService.getData();
  }
  gotoDetails(locationID){
    console.log('i was clicked');
    this.router.navigate(['sensor-details',locationID]);
  }
}
