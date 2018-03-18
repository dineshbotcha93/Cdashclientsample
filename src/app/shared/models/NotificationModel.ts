export class NotificationModel {


	 public notificationClassType:string;
	 public subnotificationClassType:string
	 public strNotificationName: string;
	 public strNotificationText: string;
	 public compareType:string;
	 public compareValue: string;
	 public scale:string;
	 public scheduleNotificationCheck: any  =  { left: false, right: false };
	 public strSnoozeAlertValue : string;
	 public scheduleSnoozeCheck: any  =  { left: false, right: false };
	 public isNotificationActive :boolean = true;

	 public strLowBatteryNotifyValue : string ;

	 public strInactivePeriodValue: string;

	 public strAfterAlertValue : string;
	 public strTimeFrameValue : string;
	 public strMessageCountValue: string;
	 public strAfterNotifyValue: string;
	 public strLowerTempHumidiftyValue : string;
	 public strHigherTempHumidiftyValue : string;
	 public selectNotifyMagnetList:any = [];

	 public scheduleInlineNotifyCheck: any  =  { left: false, right: false };

	 public notificationTemplate: string;
	 public advancedNotificationID: string;
	 public scheduleDayObjectList :any=[];
	 public gatewayList:any = [];
	 public sensorList:any = [];
	 public userList:any = [];


}