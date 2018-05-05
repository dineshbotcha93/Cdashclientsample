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
/*import { DashboardService } from './services/dashboard.service';*/
import {Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


export interface tileDetail{
  count:string;
  status:string;
  title:string;
}

@Component({
  selector: 'app-haccp',
  styleUrls: ['./haccp.component.scss'],
  templateUrl: './haccp.component.html'
})
export class HACCPComponent implements AfterViewInit, AfterContentInit {
  private tileData:Array<tileDetail> = null;
  private objectKeys = Object.keys;
  private showList = true;
  private showMap = false;
  private rows:Array<any>=['N/A'];
  private totalStatuses = {};
  private loadedStatuses = true;
  public showDailyReportsSection = false;
  private showCheckListReportsSection = false;
  private showTempReportsSection = false;

  constructor(
    private router:Router,
    private translate: TranslateService
  ){
    //super();

    this._addTiles();

  }

  _addTiles() {
    this.totalStatuses['dailyReport'] = {status:'Alerts',count:0,title:''};
    this.totalStatuses['checkListReport'] = {status:'MissedCommunication',count:0,title:''};
    this.totalStatuses['Temparature'] = {status:'LowSignal',count:0,title:''};
    /*this.totalStatuses['lowBattery'] = {status:'LowBattery', count:0,title:''};*/
  }

  ngAfterContentInit(){
    //this.tileTranslation();
  }

  forceTranslations(){
    /*this.totalStatuses['alerts'].title = this.translate.instant('tileStatus.alert');
    this.totalStatuses['missedCommunication'].title = this.translate.instant('tileStatus.missedCommunication');
    this.totalStatuses['lowSignal'].title = this.translate.instant('tileStatus.lowSignal');
    this.totalStatuses['lowBattery'].title = this.translate.instant('tileStatus.lowBattery');*/
  }

  ngAfterViewInit()	{
    //this.translate.use(localStorage.getItem('com.cdashboard.language'));
  }

  tileTranslation(){
   /* this.translate.use('en');
    this.translate.onLangChange.subscribe((e)=>{
      this.forceTranslations();
    });
    this.translate.use(localStorage.getItem('com.cdashboard.language'));*/
  }
  gotoDetails(locationID){
    this.router.navigate(['dashboard/sensor-summary',locationID]);
  }

  showReports(reportType) {
    console.log(':::::::::showReports' , reportType);

    switch (reportType) {

      case 'dailyReport' :
        this.showDailyReportsSection = true;
      case 'checkListReport':
        this.showCheckListReportsSection = true;
      case 'Temparature':
        this.showTempReportsSection = true;
      default:
        break;

    }

    //this.router.navigate(['dashboard/notificationList',sensor.status]);
  }

}
