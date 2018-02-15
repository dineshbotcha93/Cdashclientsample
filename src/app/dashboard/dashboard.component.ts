import { Component, Injector, AfterContentInit, AfterViewInit} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { DashboardService } from './services/dashboard.service';
import {MapService}           from '../shared/components/map/services/map.service';
import { MapConstants } from '../shared/components/map/constants/map.constants';
import {Router} from '@angular/router';
import { MapsAPILoader } from '@agm/core/services/maps-api-loader/maps-api-loader';
import { TranslateService } from '@ngx-translate/core';

export interface tileDetail{
  count:string;
  status:string;
  title:string;
}

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService,MapService],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit, AfterContentInit {
  private tileData:Array<tileDetail> = null;
  private mapData = [];
  private totalStatuses = {};
  private mapConstants = MapConstants.STATUS;
  private objectKeys = Object.keys;
  constructor(
    private dashboardService: DashboardService,
    private mapService:MapService,
    private router:Router,
    private translate: TranslateService){

    this.totalStatuses['alerts'] = {status:'Alerts',count:0};
    this.totalStatuses['missedCommunication'] = {status:'MissedCommunication',count:0};
    this.totalStatuses['lowSignal'] = {status:'LowSignal',count:0};
    this.totalStatuses['lowBattery'] = {status:'LowBattery', count:0};

    dashboardService.getRealData().then((realResults)=>{
      realResults.forEach((rResult)=>{
        mapService.geoCode(rResult.title+rResult.city+rResult.country).then((geoCoded)=>{
          if(geoCoded.results[0]){
            rResult.lat=geoCoded.results[0].geometry.location.lat;
            rResult.lng=geoCoded.results[0].geometry.location.lng;
          }
        });
        //rResult.alerts
        this.totalStatuses['alerts'].count+= rResult.alerts;
        this.totalStatuses['missedCommunication'].count+= rResult.missedCommunication;
        this.totalStatuses['lowSignal'].count+= rResult.lowSignal;
        this.totalStatuses['lowBattery'].count+= rResult.lowBattery;
      });
      return realResults;
    }).then((real)=>{
      this.mapData = real;
    });
  }

  ngAfterContentInit(){
    this.tileTranslation();
  }

  ngAfterViewInit()	{
    this.translate.use(localStorage.getItem('com.cdashboard.language'));
  }

  tileTranslation(){
    this.translate.use('en');
    this.translate.onLangChange.subscribe((e)=>{
      Object.keys(this.totalStatuses).forEach((tD)=>{
        switch(this.totalStatuses[tD].status){
          case 'Alerts':
          this.totalStatuses[tD].title = this.translate.instant('tileStatus.alert');
          break;
          case 'MissedCommunication':
          this.totalStatuses[tD].title = this.translate.instant('tileStatus.missedCommunication');
          break;
          case 'LowSignal':
          this.totalStatuses[tD].title = this.translate.instant('tileStatus.lowSignal');
          break;
          case 'LowBattery':
          this.totalStatuses[tD].title = this.translate.instant('tileStatus.lowBattery');
          break;
        }
      });
    });
    this.translate.use(localStorage.getItem('com.cdashboard.language'));
  }
  gotoDetails(locationID){
    this.router.navigate(['dashboard/sensor-summary',locationID]);
  }
}
