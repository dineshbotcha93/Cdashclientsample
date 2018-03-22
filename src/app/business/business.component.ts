import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BusinessService } from './services/business.service';
import { MapService } from '../shared/components/map/services/map.service';
import { MapConstants } from '../shared/components/map/constants/map.constants';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core/services/maps-api-loader/maps-api-loader';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import 'chart.piecelabel.js';

export interface TileDetail {
  count: string;
  status: string;
  title: string;
  amount: string;
}
@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  providers: [BusinessService, MapService],
  styleUrls: ['./business.component.scss'],
})
export class BusinessComponent {
  private tileData: Array<TileDetail> = [];
  private mapData = null;
  private mapConstants = MapConstants.STATUS;
  private pieChartLabels: Array<any> = [];
  private pieChartData: Array<any> = [];
  private loadedStatuses = false;
  public pieChartColors: Array<any> = [
    {
      backgroundColor: ["#D9534F", "#F0AD4E", "#26B99A", "#3498DB"]
    }];
  public pieChartType: string = 'pie';
  public pieChartOptions: any = {
    responsive: true,
    legend: {
      display: false
   },
    pieceLabel: {
      render: function(){return;}
    }
  };
  public tileClicked(e: any): void {
    let param = e.currentTarget.getAttribute('tile-name').toLowerCase().replace(/ /g, '-').trim();
    this.router.navigate(['business/customer-list/' + param]);
  }
  @ViewChild('baseChart') chart: BaseChartDirective;
  constructor(private businessService: BusinessService, private mapService: MapService, private router: Router) {

    businessService.getRealData().then((realResults) => {
      this.tileData = realResults.status;
      let tileDataObj: Array<any> = realResults.status;
      this.pieChartData = [];
      for (let tileObj of tileDataObj) {
       this.pieChartLabels.push(tileObj.title);
       this.pieChartData.push(tileObj.count);
      }
      realResults.customers.forEach(element => {
        // mapService.geoCode(element.address).then((geoCoded)=>{
        //   if(geoCoded.results[0]){
        //     element.lat = geoCoded.results[0].geometry.location.lat;
        //     element.lng = geoCoded.results[0].geometry.location.lng;
        //   }
        // });
        element.lat = element.latitude;
        element.lng = element.longitude;
      });
      this.loadedStatuses = true;
      localStorage.setItem('com.cdashboard.customerData', JSON.stringify(realResults.customers));
      return realResults;
    }).then((mData) => {
      this.mapData = mData.customers;
     // this.loadedStatuses = true;
    });

    // mapService.getData().subscribe(e => {
    //   this.mapData = e;
    //   this.mapData.height = '100px';
    //   console.log(e);
    // });
  }

}
