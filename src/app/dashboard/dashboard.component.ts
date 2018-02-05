import { Component, Injector, OnInit} from '@angular/core';
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
export class DashboardComponent implements OnInit{
  private tileData:Array<tileDetail> = null;
  private mapData = null;
  private mapConstants = MapConstants.STATUS;
  constructor(
    private dashboardService: DashboardService,
    private mapService:MapService,
    private router:Router,
    private translate: TranslateService){
    dashboardService.getData().subscribe((ds)=>{
      this.tileData = ds;
    });
    mapService.getData().subscribe((e)=>{
      this.mapData = e;
    });
  }

  ngOnInit(){
    this.tileTranslation();
  }

  tileTranslation(){
    this.translate.onLangChange.subscribe((e)=>{
      this.tileData.forEach((tD)=>{
        console.log(tD);
        //console.log(this.translate.instant('login.componentHeading'));
        switch(tD.status){
          case 'Alerts':
          tD['title'] = this.translate.instant('tileStatus.alert');
          break;
          case 'MissedCommunication':
          tD['title'] = this.translate.instant('tileStatus.missedCommunication');
          break;
          case 'LowSignal':
          tD['title'] = this.translate.instant('tileStatus.lowSignal');
          break;
          case 'LowBattery':
          tD['title'] = this.translate.instant('tileStatus.lowBattery');
          break;
        }
      });
    });

  }
  gotoDetails(locationID){
    this.router.navigate(['dashboard/sensor-summary',locationID]);
  }
}
