import { Component, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BusinessService } from '../services/business.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableComponent } from '../../shared/components/dataTable/dataTable.component';
import { TableColumn } from '@swimlane/ngx-datatable';
import {Angular2Csv} from 'angular2-csv/Angular2-csv';
import {Location} from '@angular/common';

export interface CustomerData {
  status: string;
  name: string;
  contactEmail: string;
  contactName: string;
  subscription: string;
  expiryDate: string;
  contactNumber: string;
  numberOfSensors: string;
  amount: string;
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
  @ViewChild('nameColTmpl') nameColTmpl: TemplateRef<any>;
  @ViewChild('amountColTmpl') amountColTmpl: TemplateRef<any>;
  @ViewChild('sensorsColTmpl') sensorsColTmpl: TemplateRef<any>;
  @ViewChild('renewalColTmpl') renewalColTmpl: TemplateRef<any>;
  @ViewChild('dataTable')  public dataTable: DataTableComponent;
  public rows: Array<CustomerData> = null;
  public columns: Array<any> = [];
  public limit: number = 10;
  public items: Array<CustomerData> = null;
  private tempData: Array<CustomerData> = null;
  public doFilterByStatus: string = 'select';
  public doSearchVal: string = null;
  private statusParam: string = null;
  public bsValue: Date = new Date();
  public bsValueTwo: Date = new Date();
  private customerId: number = null;
  public minDate: string = null;
  public maxDate: string = null;

  constructor(private businessService: BusinessService,
    private route: ActivatedRoute, private router: Router, private _location: Location) {
    this.route.params.subscribe((params) => {
      this.statusParam = params.status.replace(/-/g, ' ').trim();
    });
     this.rows = JSON.parse(localStorage.getItem('com.cdashboard.customerData'));
     this.tempData = JSON.parse(localStorage.getItem('com.cdashboard.customerData'));
  }


  updateFilter(event) {
    if (event.target.value !== undefined && event.target.value !== '') {
      const lowerValue = event.target.value.toLowerCase();
      this.items = this.rows.filter(
        item => item.name.toLowerCase().indexOf(lowerValue) !== -1
          || item.name.toLowerCase().toString().startsWith(lowerValue)
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
    this.columns.push({ prop: 'status', name: 'Status', cellTemplate: this.statusColorTmpl });
    this.columns.push({ prop: 'name', name: 'Name', cellTemplate: this.nameColTmpl });
    this.columns.push({ prop: 'subscription', name: 'Subscription' });
    this.columns.push({ prop: 'expiryDate', name: 'Renewal Date', cellTemplate: this.renewalColTmpl });
    this.columns.push({ prop: 'contactName', name: 'Contact Name' });
    this.columns.push({ prop: 'contactNumber', name: 'Contact Number', cellTemplate: this.phoneColTmpl });
    this.columns.push({ prop: 'contactEmail', name: 'Contact Email', cellTemplate: this.emailColTmpl });
    this.columns.push({ prop: 'numberOfSensors', name: 'Sensors', cellTemplate: this.sensorsColTmpl });
    this.columns.push({ prop: 'amount', name: 'Amount', cellTemplate: this.amountColTmpl });
  }
  onChange($event) {
    this.bsValue = $event;
    this.items = this.rows.filter(item =>
      new Date(item.expiryDate).getTime() > this.bsValue.getTime() && new Date(item.expiryDate).getTime() < this.bsValueTwo.getTime());
    this.rows = this.items;
  }

  onChangeToDp($event) {
    this.bsValueTwo = $event;
    this.items = this.rows.filter(item =>
      new Date(item.expiryDate).getTime() > this.bsValue.getTime() && new Date(item.expiryDate).getTime() < this.bsValueTwo.getTime());
    this.rows = this.items;
  }

  filterByStatus() {
    const criteria = this.doFilterByStatus.toLowerCase();
    if (criteria !== '') {
      this.rows = this.tempData.filter((item) => {
        switch (criteria) {
          case 'overdue':
            return (item.status.toLowerCase() === 'overdue') ? item : "";
          case 'new':
            return (item.status.toLowerCase() === 'new') ? item : "";
          case 'renew':
            return (item.status.toLowerCase() === 'renew') ? item : "";
          case 'due':
            return (item.status.toLowerCase() === 'due') ? item : "";
          default: return item;
        }
      });
    }
  }
  print() {
    let popupWin, strHTML;
    popupWin = window.open('','', '_blank');
    popupWin.document.open();
    strHTML = '<html><head><title>Customers List</title>';
    strHTML += '<style>th {font-size: 12px;padding-right:7px;}';
    strHTML += 'tr {font-size: 11px; text-align:center} tr td {padding-right:7px}</style></head>';
    strHTML += '<body onload="window.print();window.close()"><table>';
   for(let column of this.columns){
    strHTML += '<th>' + column.name + '</th>';
    }
    for(let row of this.rows){
      strHTML += '<tr><td>' + row.status + '</td>';
      strHTML += '<td>' + row.name + '</td>';
      strHTML += '<td>' + row.subscription + '</td>';
      strHTML += '<td>' + row.expiryDate + '</td>';
      strHTML += '<td>' + row.contactName + '</td>';
      strHTML += '<td>' + row.contactNumber + '</td>';
      strHTML += '<td>' + row.contactEmail + '</td>';
      strHTML += '<td>' + row.numberOfSensors + '</td>';
      strHTML += '<td>' + row.amount + '</td>';
      strHTML += '</tr>';
    }
    strHTML +='</table></body></html>';
    popupWin.document.write(strHTML);
    popupWin.document.close();
  }

  /* Clear form fields*/
  clearAll() {
    this.doSearchVal = '';
    this.doFilterByStatus = 'all';
    this.filterByStatus();
    this.bsValue = new Date();
    this.bsValueTwo = new Date();
  }

  /* Navigate to previous page*/

  goToPrevPage() {
    this._location.back();
  }

  /*Export CSV functionality */
  exportAsCSV() {
    const columns: TableColumn[] = this.dataTable.columns;
    const headers =
        columns
            .map((column: TableColumn) => column.name)
            .filter((e) => e);  // remove column without name (i.e. falsy value)

    const rows: any[] = this.dataTable.rows.map((row) => {
        let r = {};
        columns.forEach((column) => {
            if (!column.name) { return; }   // ignore column without name
            if (column.prop) {
                let prop = column.prop;
                r[prop] = (typeof row[prop] === 'boolean') ? (row[prop]) ? 'Yes'
                                                                         : 'No'
                                                           : row[prop];
            } else {
                // special cases handled here
            }
        })
        return r;
    });

    const options = {
        fieldSeparator  : ',',
        quoteStrings    : '"',
        decimalseparator: '.',
        showLabels      : true,
        headers         : headers,
        showTitle       : false,
        title           : 'Report',
        useBom          : true,
    };
    return new Angular2Csv(rows, 'report', options);
}
}
