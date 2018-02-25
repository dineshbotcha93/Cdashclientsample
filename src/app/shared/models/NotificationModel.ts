export class NotificationModel {

	 public selectSubNotificationList:any = [];
	 public strNotificationName: string;
	 public strNotificationText: string;
	 public selectTempCompareList:any = [];
	 public selectTempTypeList:any = [];
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

}