import { Component, OnInit,Input, Output,ViewChild ,EventEmitter} from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notification-overview',
  templateUrl: './notification-overview.component.html',
  styleUrls: ['./notification-overview.component.scss']
})
export class NotificationOverviewComponent implements OnInit {

  notificationRadio: any = 'overview';
  isAddButtonRequired:boolean = true;
  isResetButtonRequired:boolean = false;

  minDate: Date;
  maxDate: Date;
  daterangepickerModel: Date[];
  requestDateObject :any = [];

  @Input() allSensors: Array<any>;
  @Input() gateWayData: Array<any>;

  @Output() createMessageEvent = new EventEmitter<boolean>();

  constructor( private datepipe: DatePipe) { }

  ngOnInit() {

    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 7);
    this.maxDate.setDate(this.maxDate.getDate());

    this.daterangepickerModel = [this.minDate, this.maxDate];
    
    this.requestDateObject = {
      fromDate :this.datepipe.transform(this.minDate, 'mm/dd/yyyy'),
      toDate :this.datepipe.transform(this.maxDate, 'mm/dd/yyyy')
    };
  }

  onClickNotificationOverview(request:any) {
    this.notificationRadio = 'overview';
  }

  onClickNotificationSummary() {
    this.notificationRadio = 'summary';
  }

  onClickAddNotification() {
    this.notificationRadio = 'addNotify';
    this.isAddButtonRequired = false;
    this.isResetButtonRequired = true;
  }
  onClickResetNotification() {
    this.isAddButtonRequired = true;
    this.isResetButtonRequired = false;
    this.notificationRadio = 'summary';
  }

  receiveAddNotificationMessage($event) {
    console.log($event);
    this.notificationRadio = 'summary';
  }
  onClickDateRange() {

    console.log(this.daterangepickerModel);

    console.log(this.datepipe.transform(this.daterangepickerModel[0], 'mm/dd/yyyy')+'  '+this.datepipe.transform(this.daterangepickerModel[1], 'mm/dd/yyyy'));
    
    let requestDateObject = {
      fromDate:this.datepipe.transform(this.daterangepickerModel[0], 'mm/dd/yyyy'),
      toDate:this.datepipe.transform(this.daterangepickerModel[1], 'mm/dd/yyyy')
    }
    
    this.onClickNotificationOverview(requestDateObject);

  }

}
