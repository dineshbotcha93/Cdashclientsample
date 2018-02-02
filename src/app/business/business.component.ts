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
  private tileData: Array<TileDetail> = null;
  private mapData = null;
  private mapConstants = MapConstants.STATUS;
  private pieChartLabels: Array<any> = [];
  private pieChartData: Array<number> = [];
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
    console.log('testttttt');
    let param = e.currentTarget.getAttribute('tile-name').toLowerCase().replace(/ /g, '-').trim();
    this.router.navigate(['business/customer-list/' + param]);
  }
  @ViewChild('baseChart') chart: BaseChartDirective;
  constructor(private businessService: BusinessService, private mapService: MapService, private router: Router) {
    businessService.getData().subscribe(bs => {
      this.tileData = bs[0].status;      
      let tileDataObj: Array<any> = bs[0].status;
      for (let tileObj of tileDataObj) {
       this.pieChartLabels.push(tileObj.title);
       this.pieChartData.push(tileObj.count);
     }
    });
    mapService.getData().subscribe(e => {
      this.mapData = e;
      this.mapData.height = '100px';
      console.log(e);
    });
  }

}
