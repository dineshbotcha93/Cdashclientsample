import { Component } from '@angular/core';
import { FillDetailsService } from './fill-details.service';
import {Router} from '@angular/router';


@Component({
  selector: 'fill-details',
  templateUrl: './fill-details.html',
  styleUrls: ['./fill-details.component.scss'],
  providers: [FillDetailsService]
})

export class FillDetailsComponent {
  selectedStep: number;
  industries: Array<object> = [];
  businessType: Array<object> = [];
  selectedIndustry: object;
  businessTypeSelection: Array<object> = [];
  timeZones: Array<object> = [];
  constructor(private fillDetailsService: FillDetailsService, private router: Router){
    this.selectedStep = 3;
    this.fillDetailsService.getIndustries().subscribe((e)=>{
      e.forEach((res)=>{
        res.forEach((r)=>{
          if(r.Parent == null){
            this.industries.push({id:r.IndustryClassificationID, name: r.Name});
          } else {
            this.businessType.push({id:r.Parent, name: r.Name});
          }
        });
      })
    })
    this.fillDetailsService.getTimeZones().subscribe((e)=>{
      e[0].forEach((tZ)=>{
        this.timeZones.push({id:tZ.TimeZoneID,name:tZ.DisplayName});
      });
    });
  }

  industryChanged(){
    console.log("selected industry");
    console.log(this.selectedIndustry);
    this.businessTypeSelection = this.businessType.filter((res)=>res['id'] == this.selectedIndustry );
  }

  onPrevious($event){
    console.log($event);
    this.router.navigate(['user-register/user-create/fill-details']);
  }

  onNext($event){
    console.log("not implemented yet");
  }
}
