import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BusinessService } from '../services/business.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

export interface CustomerData {
  Status: string;
  Name: string;
  ContactEmail: string;
  ContactName: string;
  Subscription: string;
  RenewalDate: string;
  ContactNumber: string;
  Sensors: string;
  Amount: string;
}
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  providers: [BusinessService],
  styleUrls: ['./customer-list.component.scss']
})

export class CustomerListComponent implements OnInit {
  private data: Array<CustomerData>= null;
  private columns: Array<any>= [];
  private limit: number = 10;
  public items: Array<CustomerData> = null;
  private tempData: Array<CustomerData>= null;
  private doFilterByStatus: string = 'select';
  private statusParam: string = null;
  private bsValue: Date = new Date();
  private bsValueTwo: Date = new Date();

  constructor(private businessService: BusinessService,
  private route:ActivatedRoute,private router:Router) {
    this.route.params.subscribe((params)=>{
      this.statusParam = params.status.replace(/-/g, ' ').trim();
    });
    businessService.getData().subscribe((result) => {
    //this.result1 = result;
    console.log(result[0].customers);
    this.data    = result[0].customers;
    this.tempData = result[0].customers;
  });
  this.columns.push({prop:'Name',name:'Name'});
  this.columns.push({prop:'Subscription',name:'Subscription'});
  this.columns.push({prop:'RenewalDate',name:'Renewal Date'});
  this.columns.push({prop:'ContactName',name:'Contact Name'});
  this.columns.push({prop:'ContactNumber',name:'Contact Number'});
  this.columns.push({prop:'ContactEmail',name:'Contact Email'});
  this.columns.push({prop:'Status', name:'Status'});
  this.columns.push({prop:'Sensors',name:'Sensors'});
  this.columns.push({prop:'Amount',name:'Amount'});
  }

  updateFilter(event){
    if (event.target.value !== undefined && event.target.value !== ''){
    const lowerValue = event.target.value.toLowerCase();
    this.items = this.data.filter(item => item.Name.toLowerCase().indexOf(lowerValue) !== -1 || !lowerValue);
    this.data = this.items;
    }
    else {
      this.data = this.tempData;
    }
  }

  ngOnInit(){
    this.doFilterByStatus = this.statusParam;
    console.log(this.bsValue);
    this.filterByStatus();
  }
  // onChange($event){
  //   this.bsValue = $event;
  //     console.log(this.bsValue);
  //     console.log(this.bsValueTwo);
  //      this.items = this.data.filter(item => 
  //       item.RenewalDate.getTime() > this.bsValue.getTime() && item.RenewalDate.getTime() < this.bsValueTwo.getTime());
  //      this.data = this.items;
      
  // }

  // onChangeToDp($event){
  //   this.bsValueTwo = $event;
  //     console.log(this.bsValueTwo);
  //     console.log(this.bsValue);
  //     // this.items = this.data.filter(item => 
  //     //   item.RenewalDate.indexOf(lowerValue) !== -1 || !lowerValue);
  //     // this.data = this.items;
      
  // }

filterByStatus(){  
  const criteria = this.doFilterByStatus.toLowerCase();
  if(criteria !== ''){
    this.data = this.tempData.filter((item) =>{
      switch(criteria){
        case 'overdue':
        return (item.Status.toLowerCase() === 'overdue')? item : "";
        case 'new':
        return (item.Status.toLowerCase() === 'new')? item : "";
        case 'renewed':
        return (item.Status.toLowerCase() === 'renewed')? item : "";
        case 'due':
        return (item.Status.toLowerCase() === 'due')? item : "";
        default: return item;
      }
    });
    console.log(this.data);
  }
}

  // date: {year: number, month: number};

  // minDate = new Date(2017, 5, 10);
  // maxDate = new Date(2018, 9, 15);

  
  // bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
}
