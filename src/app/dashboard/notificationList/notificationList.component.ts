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

@Component({
  selector: 'app-notificationList',
  templateUrl: './notificationList.component.html',
  styleUrls: ['./notificationList.component.scss'],
  providers: [NotificationListService, UserProfileService]
})
export class NotificationListComponent implements OnInit, AfterViewInit {

  private columns: Array<any> = [];
  private limit = 10;
  public items: Array<any> = null;
  private statusParam: string = null;
  private doFilterByStatus = '';
  private accountID;
  @ViewChild('nDateColTmpl') nDateColTmpl: TemplateRef<any>;
  @ViewChild('sTypeColTmpl') sTypeColTmpl: TemplateRef<any>;

  showPopup = false;
  modalMessage = '';

  fromDate: string = moment().subtract(1, 'days').format('MM-DD-YYYY');
  toDate: string = moment().format('MM-DD-YYYY');
  private rows = null;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private notificationListService: NotificationListService,
    private userProfileService: UserProfileService,
  ) {

    this.route.params.subscribe((params) => {
      this.statusParam = params.status.replace(/-/g, ' ').trim();

      console.log('::::routeparam::', this.statusParam);
    });

    this.items = this.rows;
  }

  ngOnInit() {

    this.doFilterByStatus = this.statusParam;
    this.filterByStatus();
    this.columns.push({ prop: 'notificationDate', name: 'Notification Date', cellTemplate: this.nDateColTmpl });
    this.columns.push({ prop: 'name', name: 'Name'});
    this.columns.push({ prop: 'deviceName', name: 'Device Name'});
    this.columns.push({ prop: 'reading', name: 'Reading' });
    // this.columns.push({ prop: 'notificationType', name: 'Notification Type' });
    // this.columns.push({ prop: 'deviceType', name: 'Device Type' });
    this.columns.push({ prop: 'type', name: 'Sent Type', cellTemplate: this.sTypeColTmpl });
    this.columns.push({ prop: 'status', name: 'Status' });
  }

  filterByStatus() {
    const criteria = this.doFilterByStatus.toLowerCase();
    this.rows = this.items;
    if (criteria !== '' && this.rows) {
      this.rows = this.rows.filter((item) => {
        switch (criteria) {
          case 'alerts':
            return (item.type.toLowerCase() === 'alerts') ? item : '';
          case 'lowbattery':
            return (item.type.toLowerCase() === 'lowbattery') ? item : '';
          case 'advanced':
            return (item.type.toLowerCase() === 'advanced') ? item : '';
          case 'missedCommunication':
            return (item.type.toLowerCase() === 'missedCommunication') ? item : '';
          default: return item;
        }
      });
    }
  }

  ngAfterViewInit() {
    this.userProfileService.getRealData()
      .then(data => {
        this.accountID = data.user.account[0].accountID;
        this.notificationListService.getNotificationList(this.accountID, this.fromDate, this.toDate).then(e => {
          this.rows = e;
        });
      });
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
    console.log('::::::::::::', row);
    this.showPopup = true;
    this.modalMessage = row;
  }

  modalClosed(event) {
    console.log(event);
    this.showPopup = false;
  }


}
