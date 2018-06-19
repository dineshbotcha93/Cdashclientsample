import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  ViewChild ,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableComponent } from '../../shared/components/dataTable/dataTable.component';
import { TableColumn } from '@swimlane/ngx-datatable';
import { Location } from '@angular/common';
import { NotificationListService } from './notificationList.service';
import { UserProfileService } from '../../user-profile/services/user-profile.service';
import {moment} from 'ngx-bootstrap/chronos/test/chain';
import {Observable} from "rxjs/Observable";

export interface ModalMessage {
  name: string;
  email: string;
  smsNumber: string;
  text: string;
}

@Component({
  selector: 'app-notificationList',
  templateUrl: './notificationList.component.html',
  styleUrls: ['./notificationList.component.scss'],
  providers: [NotificationListService, UserProfileService]
})
export class NotificationListComponent implements OnInit {

  private columns: Array<any> = [];
  private limit = 10;
  public items: Array<any> = null;
  public allRows: Array<any> = null;
  private statusParam: string = null;
  public doFilterByStatus = '';
  private accountID;
  @ViewChild('nDateColTmpl') nDateColTmpl: TemplateRef<any>;
  @ViewChild('sTypeColTmpl') sTypeColTmpl: TemplateRef<any>;
  @ViewChild('deviceNameColTmpl') deviceNameColTmpl: TemplateRef<any>;

  showPopup = false;
  modalMessage:ModalMessage = null;
  private fromDate :Date = moment().subtract(1, 'days').toDate();
  private toDate: Date = moment().toDate();
  public bsRangeValue: any = [this.fromDate, this.toDate];
  public minDate = moment().subtract(6, 'days').toDate();
  public maxDate = moment().toDate();
  public rows = null;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private notificationListService: NotificationListService,
    private userProfileService: UserProfileService,
  ) {

    this.route.params.subscribe((params) => {
      this.statusParam = params.status.replace(/-/g, ' ').trim();
    });
  }

  ngOnInit() {

    if(this.statusParam === 'MissedCommunication') {
      this.doFilterByStatus = 'Inactivity';
    } else {
      this.doFilterByStatus = this.statusParam;
    }
    this.getNotifications();
    this.columns.push({ prop: 'notificationDate', name: 'Notification Date', cellTemplate: this.nDateColTmpl });
    this.columns.push({ prop: 'name', name: 'Name'});
    this.columns.push({ prop: 'notificationClass', name: 'Type' });
    this.columns.push({ prop: 'deviceName', name: 'Device Name', cellTemplate: this.deviceNameColTmpl});
    this.columns.push({ prop: 'reading', name: 'Reading' });
    // this.columns.push({ prop: 'notificationType', name: 'Notification Type' });
    // this.columns.push({ prop: 'deviceType', name: 'Device Type' });
    this.columns.push({ prop: 'type', name: 'Sent Type', cellTemplate: this.sTypeColTmpl });
    this.columns.push({ prop: 'status', name: 'Status' });
  }

  filterByStatus() {
    const criteria = this.doFilterByStatus.toLowerCase();
    if(criteria === 'all') {
      this.rows = this.allRows;
    } else {
      this.rows = this.allRows;
      this.rows = this.rows.filter((item) => {
        switch (criteria) {
          case 'alerts':
            return (item.notificationClass.toLowerCase() === 'alerts') ? item : '';
          case 'lowbattery':
            return (item.notificationClass.toLowerCase() === 'lowbattery') ? item : '';
          case 'advanced':
            return (item.notificationClass.toLowerCase() === 'advanced') ? item : '';
          case 'inactivity':
            return (item.notificationClass === 'Inactivity') ? item : '';
          case 'lowsignal': // API needs to be built to get low signal notifications,it doesnt exist
            return  '';
          default: return item;
        }
      });
    }
  }

  dateChange($event) {
    if($event!=undefined) {
      this.fromDate = $event[0];
      this.toDate = $event[1];
      this.getNotifications();
    }
  }

  getNotifications() {

    let fDate = moment(this.fromDate).format('MM/DD/YYYY');
    let tDate = moment(this.toDate).format('MM/DD/YYYY');

    const userObject = JSON.parse( localStorage.getItem('com.cdashboard.userInfoObject'));
    if(userObject) {
      this.accountID = userObject['account'][0].accountID;
      this.notificationListService.getNotificationList(this.accountID, fDate, tDate).then(e => {
        this.allRows = e;
      }).then(() =>
        {
          this.filterByStatus();
        }
      ).catch((e) => {
        //console.log('Error Occurred getNotificationList');
      });
    } else {
      this.userProfileService.getRealData()
        .then(data => {
          this.accountID = data.user.account[0].accountID; // remove this later,make a call only if there is no account id in the loca storage
          this.notificationListService.getNotificationList(this.accountID, fDate, tDate).then(e => {
            this.allRows = e;
          });
        }).then(() =>
      {
        this.filterByStatus();
      });
    }

  }

  onChange($event) {
    this.fromDate = $event;
    this.items = this.rows
      .filter(item => new Date(item.notificationDate).getTime() > new Date(this.fromDate).getTime()
        && new Date(item.notificationDate).getTime() < new Date(this.toDate).getTime());
    this.rows = this.items;
  }

  onChangeToDp($event) {
    this.toDate = $event;
    this.items = this.rows.filter(item =>
      new Date(item.notificationDate).getTime() > new Date(this.fromDate).getTime()
      && new Date(item.notificationDate).getTime() < new Date(this.toDate).getTime());
    this.rows = this.items;
  }


  goToPrevPage() {
    this.router.navigate(['dashboard']);

  }

  showNotification(row) {
    this.showPopup = true;
    this.modalMessage = row;
  }

  modalClosed(event) {
    this.showPopup = false;
  }


}
