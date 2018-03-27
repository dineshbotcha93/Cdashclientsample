import {
  Component,
  Injector,
  AfterContentInit,
  AfterViewInit,
  ViewContainerRef
} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { DashboardService } from './services/dashboard.service';
import {MapService}           from '../shared/components/map/services/map.service';
import { MapConstants } from '../shared/components/map/constants/map.constants';
import {Router} from '@angular/router';
import { MapsAPILoader } from '@agm/core/services/maps-api-loader/maps-api-loader';
import { TranslateService } from '@ngx-translate/core';
import { AbstractDashboardBase } from './abstractDashboard.component';

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
export class DashboardComponent extends AbstractDashboardBase implements AfterViewInit, AfterContentInit {
  private tileData:Array<tileDetail> = null;
  private mapData = [];
  private totalStatuses = {};
  private mapConstants = MapConstants.STATUS;
  private objectKeys = Object.keys;
  private loadedStatuses = false;
  private showList = false;
  private showMap = true;
  private rows:Array<any>=['N/A'];

  constructor(
    private dashboardService: DashboardService,
    private mapService:MapService,
    private router:Router,
    private translate: TranslateService
  ){
    super();

    this.totalStatuses['alerts'] = {status:'Alerts',count:0,title:''};
    this.totalStatuses['missedCommunication'] = {status:'MissedCommunication',count:0,title:''};
    this.totalStatuses['lowSignal'] = {status:'LowSignal',count:0,title:''};
    this.totalStatuses['lowBattery'] = {status:'LowBattery', count:0,title:''};

    dashboardService.getRealData().then((realResults)=>{

      this.rows = [];

      realResults.forEach((rResult)=>{
        // mapService.geoCode(rResult.title+rResult.city+rResult.country).then((geoCoded)=>{
        //   if(geoCoded.results[0]){
        //     rResult.lat=geoCoded.results[0].geometry.location.lat;
        //     rResult.lng=geoCoded.results[0].geometry.location.lng;
        //   }
        // });
        //rResult.alerts
        this.totalStatuses['alerts'].count+= rResult.alerts;
        this.totalStatuses['missedCommunication'].count+= rResult.missedCommunication;
        this.totalStatuses['lowSignal'].count+= rResult.lowSignal;
        this.totalStatuses['lowBattery'].count+= rResult.lowBattery;
        const addressData = (rResult.address || '')+ ', '
        + (rResult.address2 || '') + ', '
        + (rResult.city|| '') + ', '
        + (rResult.state || '') +', '
        + (rResult.postalCode || '') + ', '
        + (rResult.country || '') + '';
        this.rows.push({
          title:rResult.title,
          address: addressData,
          id:rResult.id,
          lat: rResult.latitude,
          lng: rResult.longitude
        });
        rResult.lat = rResult.latitude;
        rResult.lng = rResult.longitude;
      });
      return realResults;
    }).then((real) => {
      this.mapData = real;
      this.loadedStatuses = true;
      this.forceTranslations();
    });
  }

  ngAfterContentInit(){
    this.tileTranslation();
  }

  forceTranslations(){
    this.totalStatuses['alerts'].title = this.translate.instant('tileStatus.alert');
    this.totalStatuses['missedCommunication'].title = this.translate.instant('tileStatus.missedCommunication');
    this.totalStatuses['lowSignal'].title = this.translate.instant('tileStatus.lowSignal');
    this.totalStatuses['lowBattery'].title = this.translate.instant('tileStatus.lowBattery');
  }

  ngAfterViewInit()	{
    this.translate.use(localStorage.getItem('com.cdashboard.language'));
  }

  tileTranslation(){
    this.translate.use('en');
    this.translate.onLangChange.subscribe((e)=>{
      this.forceTranslations();
    });
    this.translate.use(localStorage.getItem('com.cdashboard.language'));
  }
  gotoDetails(locationID){
    this.router.navigate(['dashboard/sensor-summary',locationID]);
  }

  gotoNotificationList(sensor) {
  // console.log(':::::::::goToNotificationList' , sensor);
    this.router.navigate(['dashboard/notificationList',sensor.status]);
  }

  showListView() {
    this.showList = true;
    this.showMap = false;
  }

  showMapView() {
    this.showMap = true;
    this.showList = false;
  }

  onLocationSelect(selectedLocation) {
    this.gotoDetails(selectedLocation.id);
  }
}
