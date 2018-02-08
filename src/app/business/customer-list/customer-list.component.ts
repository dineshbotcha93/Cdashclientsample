import { Component, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BusinessService } from '../services/business.service';
import { ActivatedRoute, Router } from '@angular/router';

export interface CustomerData {
  Status: string;
  Title: string;
  ContactEmail: string;
  ContactName: string;
  Subscription: string;
  ExpiryDate: string;
  ContactNumber: string;
  Sensors: string;
  Amount: string;
}

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  providers: [BusinessService],
  styleUrls: ['./customer-list.component.scss'],
})

export class CustomerListComponent implements OnInit {
  @ViewChild('statusColorTmpl') statusColorTmpl: TemplateRef<any>;
  @ViewChild('emailColTmpl') emailColTmpl: TemplateRef<any>;
  @ViewChild('phoneColTmpl') phoneColTmpl: TemplateRef<any>;
  private rows: Array<CustomerData> = null;
  private columns: Array<any> = [];
  private limit: number = 10;
  public items: Array<CustomerData> = null;
  private tempData: Array<CustomerData> = null;
  private doFilterByStatus: string = 'select';
  private statusParam: string = null;
  private bsValue: Date = new Date();
  private bsValueTwo: Date = new Date();

  constructor(private businessService: BusinessService,
    private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params) => {
      this.statusParam = params.status.replace(/-/g, ' ').trim();
    });
    businessService.getData().subscribe((result) => {
      //this.result1 = result;
      this.rows = result[0].Customers;
      this.tempData = result[0].Customers;
    });
  }


  updateFilter(event) {
    if (event.target.value !== undefined && event.target.value !== '') {
      const lowerValue = event.target.value.toLowerCase();
      this.items = this.rows.filter(
        item => item.Title.toLowerCase().indexOf(lowerValue) !== -1
          || item.Title.toLowerCase().toString().startsWith(lowerValue)
          || !lowerValue);
      this.rows = this.items;
    }
    else {
      this.rows = this.tempData;
    }
  }

  ngOnInit() {
    this.doFilterByStatus = this.statusParam;
    this.filterByStatus();
    this.columns.push({ prop: 'Status', name: 'Status', cellTemplate: this.statusColorTmpl });
    this.columns.push({ prop: 'Title', name: 'Name' });
    this.columns.push({ prop: 'Subscription', name: 'Subscription' });
    this.columns.push({ prop: 'ExpiryDate', name: 'Renewal Date' });
    this.columns.push({ prop: 'ContactName', name: 'Contact Name' });
    this.columns.push({ prop: 'ContactNumber', name: 'Contact Number', cellTemplate: this.phoneColTmpl });
    this.columns.push({ prop: 'ContactEmail', name: 'Contact Email', cellTemplate: this.emailColTmpl });
    this.columns.push({ prop: 'NumberOfSensors', name: 'Sensors' });
    this.columns.push({ prop: 'Amount', name: 'Amount' });
  }
  onChange($event) {
    this.bsValue = $event;
    this.items = this.rows.filter(item =>
      new Date(item.ExpiryDate).getTime() > this.bsValue.getTime() && new Date(item.ExpiryDate).getTime() < this.bsValueTwo.getTime());
    this.rows = this.items;
  }

  onChangeToDp($event) {
    this.bsValueTwo = $event;
    this.items = this.rows.filter(item =>
      new Date(item.ExpiryDate).getTime() > this.bsValue.getTime() && new Date(item.ExpiryDate).getTime() < this.bsValueTwo.getTime());
    this.rows = this.items;
  }

  filterByStatus() {
    const criteria = this.doFilterByStatus.toLowerCase();
    if (criteria !== '') {
      this.rows = this.tempData.filter((item) => {
        switch (criteria) {
          case 'overdue':
            return (item.Status.toLowerCase() === 'overdue') ? item : "";
          case 'new':
            return (item.Status.toLowerCase() === 'new') ? item : "";
          case 'renewed':
            return (item.Status.toLowerCase() === 'renewed') ? item : "";
          case 'due':
            return (item.Status.toLowerCase() === 'due') ? item : "";
          default: return item;
        }
      });
    }
  }
}
