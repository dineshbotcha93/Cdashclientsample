import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { DashboardService } from './services/dashboard.service';

@Component({

  selector: 'app-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent{
  data:String[]=[];
  constructor(private dashboardService: DashboardService){
    this.dashboardService.getData().then((result)=>{
      this.data = result;
    }).catch((e)=>{
      console.log(e);
    });
  }
}
