import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { SensorSummaryService } from '../../dashboard/sensor-summary/services/sensor-summary.service';

@Component({
  selector: 'app-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.scss'],

  providers: [ SensorSummaryService]
})
export class UserNotificationsComponent implements OnInit {

  notificationRadio: any = 'summary';
  isAddButtonRequired:boolean = true;
  isResetButtonRequired:boolean = false;
  EditNotifyMode : boolean = false;

  accountID:string;

  isValidForm = true;
  deviceCreationError: string | null = null;


  @Output() editNotifyModeEvent = new EventEmitter<boolean>();
  @Output() createMessageEvent = new EventEmitter<boolean>();
  

  // @Input() sensorList: any;
  @Input() sensorList: any;
  @Input() gatewayList: Array<any>;
  @Input() editNotifyObject: any;
  @Input() notifyOperationType: string = "addNotify";
  @Input() accountData: any;
  @Input() globalNotificationsList: any;


  constructor(private sensorSummaryService: SensorSummaryService) { 
   this.deviceCreationError = "Please wait until loading complete ..... ";
 }

  ngOnInit() {

    this.isValidForm = false;
     let userInfoObject = JSON.parse(localStorage.getItem('com.cdashboard.userInfoObject'));
    console.log(userInfoObject);
    userInfoObject['account'].forEach(loc => {
       console.log('loc', loc);
       this.accountID = loc.accountID;
     });

//     this.globalNotificationsList = {"customer":{"id":72,"name":"broken arrow public schools","timeZoneID":6,"address":"123 Place st City XY 12345","activationDate":"2017-02-14T19:00:55","expiryDate":"2019-03-02T00:00:00","amount":103.0,"status":"Renew","subscription":"Premiere","contactName":"amy LastName","contactEmail":"Reclamationbin@gmail.com","contactNumber":"555-555-1234","numberOfSensors":55,"numberOfGateways":26,"latitude":0.0,"longitude":0.0},"networks":[{"csNetID":1231,"name":"Oneta Ridge MS","sendNotifications":false},{"csNetID":1232,"name":"Rhoades ES","sendNotifications":true},{"csNetID":1233,"name":"Spring Creek ES","sendNotifications":true},{"csNetID":1234,"name":"Creekwood ES","sendNotifications":true},{"csNetID":1235,"name":"Childers MS","sendNotifications":true},{"csNetID":1240,"name":"Arrowhead ES","sendNotifications":true},{"csNetID":1241,"name":"Vandever ES","sendNotifications":true},{"csNetID":1242,"name":"Broken Arrow HS","sendNotifications":true},{"csNetID":1243,"name":"Highland Park ES","sendNotifications":true},{"csNetID":1255,"name":"Leisure Park ES","sendNotifications":true},{"csNetID":1257,"name":"Country Lane Primary ES","sendNotifications":true},{"csNetID":1258,"name":"Country Lane Intermediate ES","sendNotifications":true},{"csNetID":1259,"name":"Centennial MS","sendNotifications":true},{"csNetID":1260,"name":"Sequoyah MS","sendNotifications":true},{"csNetID":1261,"name":"Oliver MS","sendNotifications":true},{"csNetID":1262,"name":"Broken Arrow Alternative Academy","sendNotifications":true},{"csNetID":1263,"name":"Liberty ES","sendNotifications":true},{"csNetID":1264,"name":"Oak Crest ES","sendNotifications":true},{"csNetID":1265,"name":"Arrow Springs ECC","sendNotifications":true},{"csNetID":1266,"name":"Park Lane ECC","sendNotifications":true},{"csNetID":1267,"name":"Wolf Creek ES","sendNotifications":true},{"csNetID":1268,"name":"Broken Arrow Freshman Academy","sendNotifications":true},{"csNetID":1269,"name":"Lynn Wood ES","sendNotifications":true},{"csNetID":1436,"name":"Timber Ridge ES","sendNotifications":true},{"csNetID":1486,"name":"Aspen Creek ES","sendNotifications":true},{"csNetID":1518,"name":"Central Warehouse","sendNotifications":true}],"sensors":[{"sensorID":1163133186,"sensorName":"Arrow test  ECC Cooler 1163133186","sensorType":"2","csNetID":1231},{"sensorID":1163137205,"sensorName":"Back Cooler Jig test","sensorType":"2","csNetID":1231},{"sensorID":1163134090,"sensorName":"Oneta Ridge MS Freezer 1163134090 ","sensorType":"2","csNetID":1231},{"sensorID":1163137189,"sensorName":"Rhoades ES Cooler 1163137189 ","sensorType":"2","csNetID":1232},{"sensorID":1163137248,"sensorName":"Rhoades ES Freezer 1163137248 ","sensorType":"2","csNetID":1232},{"sensorID":1163134160,"sensorName":"Spring Creek ES Cooler 1163134160 ","sensorType":"2","csNetID":1233},{"sensorID":1163139101,"sensorName":"Spring Creek ES freezer 1163139101 ","sensorType":"2","csNetID":1233},{"sensorID":1163134217,"sensorName":"Creekwood ES cooler 1163134217 ","sensorType":"2","csNetID":1234},{"sensorID":1163133136,"sensorName":"Creekwood ES Freezer 1163133136 ","sensorType":"2","csNetID":1234},{"sensorID":1163134098,"sensorName":"Childers MS Cooler 1163134098 ","sensorType":"2","csNetID":1235},{"sensorID":1163134086,"sensorName":"Childers MS Freezer 1163134086 ","sensorType":"2","csNetID":1235},{"sensorID":1163134148,"sensorName":"Arrowhead ES Cooler 1163134148 ","sensorType":"2","csNetID":1240},{"sensorID":1163138246,"sensorName":"Arrowhead ES Freezer 1163138246 ","sensorType":"2","csNetID":1240},{"sensorID":1191002169,"sensorName":"Vandever ES Cooler 1191002169","sensorType":"2","csNetID":1241},{"sensorID":1163134156,"sensorName":"Vandever ES Freezer 1163134156  ","sensorType":"2","csNetID":1241},{"sensorID":1163138004,"sensorName":"Broken Arrow HS Baker Cooler 1163138004 ","sensorType":"2","csNetID":1242},{"sensorID":1163134144,"sensorName":"Broken Arrow HS Baker Freezer 1163134144 ","sensorType":"2","csNetID":1242},{"sensorID":1163137120,"sensorName":"Broken Arrow HS Main Cooler 1163137120 ","sensorType":"2","csNetID":1242},{"sensorID":1163134175,"sensorName":"Broken Arrow HS Main Freezer 1163134175 ","sensorType":"2","csNetID":1242},{"sensorID":1163133164,"sensorName":"Highland Park ES Cooler 1163133164 ","sensorType":"2","csNetID":1243},{"sensorID":1163134246,"sensorName":"Highland Park ES Freezer 1163134246 ","sensorType":"2","csNetID":1243},{"sensorID":1163132222,"sensorName":"Leisure Park ES Cooler 1163132222 ","sensorType":"2","csNetID":1255},{"sensorID":1163133234,"sensorName":"Leisure Park ES Freezer 1163133234 ","sensorType":"2","csNetID":1255},{"sensorID":1163132225,"sensorName":"Country Lane Primary Cooler 1163132225 ","sensorType":"2","csNetID":1257},{"sensorID":1163132221,"sensorName":" Country Lane Primary Freezer 1163132221","sensorType":"2","csNetID":1257},{"sensorID":1163133120,"sensorName":" Country Lane Intermediate Cooler 1163133120","sensorType":"2","csNetID":1258},{"sensorID":1163137220,"sensorName":"Country Lane Intermediate Freezer 1163137220 ","sensorType":"2","csNetID":1258},{"sensorID":1163134230,"sensorName":"Centennial MS Cooler 1163134230 ","sensorType":"2","csNetID":1259},{"sensorID":1163134205,"sensorName":"Centennial MS Freezer 1163134205 ","sensorType":"2","csNetID":1259},{"sensorID":1163133124,"sensorName":"Sequoyah MS Cooler 1163133124 ","sensorType":"2","csNetID":1260},{"sensorID":1163132248,"sensorName":"Sequoyah MS Freezer 1163132248 ","sensorType":"2","csNetID":1260},{"sensorID":1163140048,"sensorName":"Oliver MS Cooler 1163140048 ","sensorType":"2","csNetID":1261},{"sensorID":1163138228,"sensorName":"Oliver MS Freezer 1163138228 ","sensorType":"2","csNetID":1261},{"sensorID":1163138000,"sensorName":"Alternative Academy Cooler 1163138000 ","sensorType":"2","csNetID":1262},{"sensorID":1163135243,"sensorName":"Alternative Academy Freezer 1163135243 ","sensorType":"2","csNetID":1262},{"sensorID":1163134242,"sensorName":"Liberty ES Cooler 1163134242 ","sensorType":"2","csNetID":1263},{"sensorID":1163139206,"sensorName":"Liberty ES Freezer 1163139206 ","sensorType":"2","csNetID":1263},{"sensorID":1163134164,"sensorName":"Oak Crest ES Cooler 1163134164 ","sensorType":"2","csNetID":1264},{"sensorID":1163134226,"sensorName":"Oak Crest ES Freezer 1163134226 ","sensorType":"2","csNetID":1264},{"sensorID":1163134213,"sensorName":"Arrow Springs ECC Freezer 1163134213 ","sensorType":"2","csNetID":1265},{"sensorID":1163132226,"sensorName":"Park Lane ECC Cooler 1163132226 ","sensorType":"2","csNetID":1266},{"sensorID":1163133152,"sensorName":"Park Lane ECC Freezer 1163133152 ","sensorType":"2","csNetID":1266},{"sensorID":1163134238,"sensorName":"Wolf Creek ES Cooler 1163134238 ","sensorType":"2","csNetID":1267},{"sensorID":1163133156,"sensorName":"Wolf Creek ES Freezer 1163133156 ","sensorType":"2","csNetID":1267},{"sensorID":1190120251,"sensorName":"Freshman Academy Baker Cooler 1190120251","sensorType":"2","csNetID":1268},{"sensorID":1163134069,"sensorName":"Freshman Academy Main Cooler 1163134069 ","sensorType":"2","csNetID":1268},{"sensorID":1163134179,"sensorName":"Freshman Academy Main Freezer 1163134179","sensorType":"2","csNetID":1268},{"sensorID":1163134152,"sensorName":"Lynn Wood ES Cooler 1163134152 ","sensorType":"2","csNetID":1269},{"sensorID":1163133182,"sensorName":"Lynn Wood ES Freezer 1163133182 ","sensorType":"2","csNetID":1269},{"sensorID":1163138012,"sensorName":"Timber Ridge Cooler 1163138012 ","sensorType":"2","csNetID":1436},{"sensorID":1163139102,"sensorName":"Timber Ridge Freezer 1163139102 ","sensorType":"2","csNetID":1436},{"sensorID":1163133190,"sensorName":"Aspen Creek ES Cooler 1163133190 ","sensorType":"2","csNetID":1486},{"sensorID":1163137252,"sensorName":"Aspen Creek ES Freezer 1163137252 ","sensorType":"2","csNetID":1486},{"sensorID":1163133230,"sensorName":"Central Warehouse Cooler 1163133230 ","sensorType":"2","csNetID":1518},{"sensorID":1163139110,"sensorName":"Central Warehouse Freezer 1163139110 ","sensorType":"2","csNetID":1518}],"gateways":[{"gatewayID":1607990334,"name":"Base Station Oneta Ridge MS - 1607990334","gatewayType":"Base Station","csNetID":1231},{"gatewayID":1607990450,"name":"Base Station Rhoades ES - 1607990450","gatewayType":"Base Station","csNetID":1232},{"gatewayID":1607990335,"name":"Base Station Spring Creek ES - 1607990335","gatewayType":"Base Station","csNetID":1233},{"gatewayID":1611050619,"name":"Base Station Creekwood ES - 1611050619","gatewayType":"Base Station","csNetID":1234},{"gatewayID":1607990453,"name":"Base Station Childers MS - 1607990453","gatewayType":"Base Station","csNetID":1235},{"gatewayID":1607990278,"name":"Base Station Arrowhead ES - 1607990278","gatewayType":"Base Station","csNetID":1240},{"gatewayID":1607990494,"name":"Base Station Vandever ES - 1607990494","gatewayType":"Base Station","csNetID":1241},{"gatewayID":1607990281,"name":"Base Station Senior High School - 1607990281","gatewayType":"Base Station","csNetID":1242},{"gatewayID":1607990455,"name":"Base Station Highland Park ES - 1607990455","gatewayType":"Base Station","csNetID":1243},{"gatewayID":1605950532,"name":"Base Station Leisure Park ES - 1605950532","gatewayType":"Base Station","csNetID":1255},{"gatewayID":1607990460,"name":"Base Station Country Lane Primary ES - 1607990460","gatewayType":"Base Station","csNetID":1257},{"gatewayID":1607990288,"name":"Base Station Country Lane Intermediate - 1607990288","gatewayType":"Base Station","csNetID":1258},{"gatewayID":1067990495,"name":"Base Station Centennial MS - 1067990495","gatewayType":"Base Station","csNetID":1259},{"gatewayID":1067990502,"name":"Base Station Sequoyah MS - 1067990502","gatewayType":"Base Station","csNetID":1260},{"gatewayID":1607990282,"name":"Base Station Oliver MS  - 1607990282","gatewayType":"Base Station","csNetID":1261},{"gatewayID":1607990336,"name":"Base Station Alternative Academy - 1607990336","gatewayType":"Base Station","csNetID":1262},{"gatewayID":1067990292,"name":"Base Station Liberty ES - 1067990292","gatewayType":"Base Station","csNetID":1263},{"gatewayID":1607990242,"name":"Base Station Oak Crest ES - 1607990242","gatewayType":"Base Station","csNetID":1264},{"gatewayID":1607990500,"name":"Base Station ArrowSprings ES- 1607990500","gatewayType":"Base Station","csNetID":1265},{"gatewayID":1611050805,"name":"Base Station Park Lane ECC 1611050805","gatewayType":"Base Station","csNetID":1266},{"gatewayID":1607990352,"name":"Base Station Wolf Creek ES - 1607990352","gatewayType":"Base Station","csNetID":1267},{"gatewayID":1607990280,"name":"Base Station Freshman Academy  - 1607990280","gatewayType":"Base Station","csNetID":1268},{"gatewayID":1607990501,"name":"Base Station Lynn Wood ES - 1607990501","gatewayType":"Base Station","csNetID":1269},{"gatewayID":1605950534,"name":"Base Station Timber Ridge ES - 1605950534","gatewayType":"Base Station","csNetID":1436},{"gatewayID":1607990447,"name":"Base Station Aspen Creek ES - 1607990447","gatewayType":"Base Station","csNetID":1486},{"gatewayID":1607990283,"name":"Base Station Central Warehouse - 1607990283","gatewayType":"Base Station","csNetID":1518}],"users":[{"userID":227,"userName":"User227","name":"amy LastName","firstName":null,"lastName":null,"smsCarrierID":0,"directSMS":true,"recievesMaintenanceByEmail":true,"recievesMaintenanceBySMS":true,"recievesNotificaitonsBySMS":true,"recievesNotificaitonsByVoice":false,"voiceNumber":"","emailAddress":"Reclamationbin@gmail.com","smsNumber":"555-555-1234","admin":true,"networkPermissions":null},{"userID":229,"userName":"User229","name":"steve LastName","firstName":null,"lastName":null,"smsCarrierID":0,"directSMS":false,"recievesMaintenanceByEmail":false,"recievesMaintenanceBySMS":false,"recievesNotificaitonsBySMS":true,"recievesNotificaitonsByVoice":false,"voiceNumber":"","emailAddress":"Reclamationbin@gmail.com","smsNumber":"555-555-1234","admin":true,"networkPermissions":null},{"userID":230,"userName":"User230","name":"Lora LastName","firstName":null,"lastName":null,"smsCarrierID":0,"directSMS":false,"recievesMaintenanceByEmail":false,"recievesMaintenanceBySMS":false,"recievesNotificaitonsBySMS":false,"recievesNotificaitonsByVoice":false,"voiceNumber":"","emailAddress":"Reclamationbin@gmail.com","smsNumber":"555-555-1234","admin":true,"networkPermissions":null},{"userID":231,"userName":"User231","name":"Luanne LastName","firstName":null,"lastName":null,"smsCarrierID":0,"directSMS":true,"recievesMaintenanceByEmail":true,"recievesMaintenanceBySMS":true,"recievesNotificaitonsBySMS":true,"recievesNotificaitonsByVoice":false,"voiceNumber":"","emailAddress":"Reclamationbin@gmail.com","smsNumber":"555-555-1234","admin":true,"networkPermissions":null}],"paymentHistories":[{"id":10049,"stripeChargeID":"ch_1C6zXyESUgWDdX8xjsFbWiLi","type":"Online","productName":"NotifEye","customerID":72,"customerName":"User227","accountID":72,"accountName":"broken arrow public schools","oldRenewalDate":"2018-03-02","newRenewalDate":"2019-03-02","historyDate":"2018-03-18","subscriptionAmount":200.0,"taxString":"3","taxAmount":6.0,"totalAmount":206.0,"invoiceDownloadLink":"http://localhost:1191/api/payment/Invoice?PaymentHistoryID=10049"}]};

// //     this.globalNotificationsList = {"customer":{"id":72,"name":"broken arrow public schools","address":"123 Place st City XY 12345","activationDate":"2017-02-14T19:00:55","expiryDate":"2019-03-02T00:00:00","amount":206.0,"status":"Renew","subscription":"Primere","contactName":"amy LastName","contactEmail":"Reclamationbin@gmail.com","contactNumber":"555-555-1234","numberOfSensors":55,"numberOfGateways":26,"latitude":0.0,"longitude":0.0},"networks":[{"csNetID":1231,"name":"Oneta Ridge MS","sendNotifications":true},{"csNetID":1232,"name":"Rhoades ES","sendNotifications":true},{"csNetID":1233,"name":"Spring Creek ES","sendNotifications":true},{"csNetID":1234,"name":"Creekwood ES","sendNotifications":true},{"csNetID":1235,"name":"Childers MS","sendNotifications":true},{"csNetID":1240,"name":"Arrowhead ES","sendNotifications":true},{"csNetID":1241,"name":"Vandever ES","sendNotifications":true},{"csNetID":1242,"name":"Broken Arrow HS","sendNotifications":true},{"csNetID":1243,"name":"Highland Park ES","sendNotifications":true},{"csNetID":1255,"name":"Leisure Park ES","sendNotifications":true},{"csNetID":1257,"name":"Country Lane Primary ES","sendNotifications":true},{"csNetID":1258,"name":"Country Lane Intermediate ES","sendNotifications":true},{"csNetID":1259,"name":"Centennial MS","sendNotifications":true},{"csNetID":1260,"name":"Sequoyah MS","sendNotifications":true},{"csNetID":1261,"name":"Oliver MS","sendNotifications":true},{"csNetID":1262,"name":"Broken Arrow Alternative Academy","sendNotifications":true},{"csNetID":1263,"name":"Liberty ES","sendNotifications":true},{"csNetID":1264,"name":"Oak Crest ES","sendNotifications":true},{"csNetID":1265,"name":"Arrow Springs ECC","sendNotifications":true},{"csNetID":1266,"name":"Park Lane ECC","sendNotifications":true},{"csNetID":1267,"name":"Wolf Creek ES","sendNotifications":true},{"csNetID":1268,"name":"Broken Arrow Freshman Academy","sendNotifications":true},{"csNetID":1269,"name":"Lynn Wood ES","sendNotifications":true},{"csNetID":1436,"name":"Timber Ridge ES","sendNotifications":true},{"csNetID":1486,"name":"Aspen Creek ES","sendNotifications":true},{"csNetID":1518,"name":"Central Warehouse","sendNotifications":true}],"sensors":[{"sensorID":1163133186,"sensorName":"Arrow Springs ECC Cooler 1163133186","sensorType":"2","csNetID":1231},{"sensorID":1163137205,"sensorName":"Back Cooler Jig","sensorType":"2","csNetID":1231},{"sensorID":1163134090,"sensorName":"Oneta Ridge MS Freezer 1163134090 ","sensorType":"2","csNetID":1231},{"sensorID":1163137189,"sensorName":"Rhoades ES Cooler 1163137189 ","sensorType":"2","csNetID":1232},{"sensorID":1163137248,"sensorName":"Rhoades ES Freezer 1163137248 ","sensorType":"2","csNetID":1232},{"sensorID":1163134160,"sensorName":"Spring Creek ES Cooler 1163134160 ","sensorType":"2","csNetID":1233},{"sensorID":1163139101,"sensorName":"Spring Creek ES freezer 1163139101 ","sensorType":"2","csNetID":1233},{"sensorID":1163134217,"sensorName":"Creekwood ES cooler 1163134217 ","sensorType":"2","csNetID":1234},{"sensorID":1163133136,"sensorName":"Creekwood ES Freezer 1163133136 ","sensorType":"2","csNetID":1234},{"sensorID":1163134098,"sensorName":"Childers MS Cooler 1163134098 ","sensorType":"2","csNetID":1235},{"sensorID":1163134086,"sensorName":"Childers MS Freezer 1163134086 ","sensorType":"2","csNetID":1235},{"sensorID":1163134148,"sensorName":"Arrowhead ES Cooler 1163134148 ","sensorType":"2","csNetID":1240},{"sensorID":1163138246,"sensorName":"Arrowhead ES Freezer 1163138246 ","sensorType":"2","csNetID":1240},{"sensorID":1191002169,"sensorName":"Vandever ES Cooler 1191002169","sensorType":"2","csNetID":1241},{"sensorID":1163134156,"sensorName":"Vandever ES Freezer 1163134156  ","sensorType":"2","csNetID":1241},{"sensorID":1163138004,"sensorName":"Broken Arrow HS Baker Cooler 1163138004 ","sensorType":"2","csNetID":1242},{"sensorID":1163134144,"sensorName":"Broken Arrow HS Baker Freezer 1163134144 ","sensorType":"2","csNetID":1242},{"sensorID":1163137120,"sensorName":"Broken Arrow HS Main Cooler 1163137120 ","sensorType":"2","csNetID":1242},{"sensorID":1163134175,"sensorName":"Broken Arrow HS Main Freezer 1163134175 ","sensorType":"2","csNetID":1242},{"sensorID":1163133164,"sensorName":"Highland Park ES Cooler 1163133164 ","sensorType":"2","csNetID":1243},{"sensorID":1163134246,"sensorName":"Highland Park ES Freezer 1163134246 ","sensorType":"2","csNetID":1243},{"sensorID":1163132222,"sensorName":"Leisure Park ES Cooler 1163132222 ","sensorType":"2","csNetID":1255},{"sensorID":1163133234,"sensorName":"Leisure Park ES Freezer 1163133234 ","sensorType":"2","csNetID":1255},{"sensorID":1163132225,"sensorName":"Country Lane Primary Cooler 1163132225 ","sensorType":"2","csNetID":1257},{"sensorID":1163132221,"sensorName":" Country Lane Primary Freezer 1163132221","sensorType":"2","csNetID":1257},{"sensorID":1163133120,"sensorName":" Country Lane Intermediate Cooler 1163133120","sensorType":"2","csNetID":1258},{"sensorID":1163137220,"sensorName":"Country Lane Intermediate Freezer 1163137220 ","sensorType":"2","csNetID":1258},{"sensorID":1163134230,"sensorName":"Centennial MS Cooler 1163134230 ","sensorType":"2","csNetID":1259},{"sensorID":1163134205,"sensorName":"Centennial MS Freezer 1163134205 ","sensorType":"2","csNetID":1259},{"sensorID":1163133124,"sensorName":"Sequoyah MS Cooler 1163133124 ","sensorType":"2","csNetID":1260},{"sensorID":1163132248,"sensorName":"Sequoyah MS Freezer 1163132248 ","sensorType":"2","csNetID":1260},{"sensorID":1163140048,"sensorName":"Oliver MS Cooler 1163140048 ","sensorType":"2","csNetID":1261},{"sensorID":1163138228,"sensorName":"Oliver MS Freezer 1163138228 ","sensorType":"2","csNetID":1261},{"sensorID":1163138000,"sensorName":"Alternative Academy Cooler 1163138000 ","sensorType":"2","csNetID":1262},{"sensorID":1163135243,"sensorName":"Alternative Academy Freezer 1163135243 ","sensorType":"2","csNetID":1262},{"sensorID":1163134242,"sensorName":"Liberty ES Cooler 1163134242 ","sensorType":"2","csNetID":1263},{"sensorID":1163139206,"sensorName":"Liberty ES Freezer 1163139206 ","sensorType":"2","csNetID":1263},{"sensorID":1163134164,"sensorName":"Oak Crest ES Cooler 1163134164 ","sensorType":"2","csNetID":1264},{"sensorID":1163134226,"sensorName":"Oak Crest ES Freezer 1163134226 ","sensorType":"2","csNetID":1264},{"sensorID":1163134213,"sensorName":"Arrow Springs ECC Freezer 1163134213 ","sensorType":"2","csNetID":1265},{"sensorID":1163132226,"sensorName":"Park Lane ECC Cooler 1163132226 ","sensorType":"2","csNetID":1266},{"sensorID":1163133152,"sensorName":"Park Lane ECC Freezer 1163133152 ","sensorType":"2","csNetID":1266},{"sensorID":1163134238,"sensorName":"Wolf Creek ES Cooler 1163134238 ","sensorType":"2","csNetID":1267},{"sensorID":1163133156,"sensorName":"Wolf Creek ES Freezer 1163133156 ","sensorType":"2","csNetID":1267},{"sensorID":1190120251,"sensorName":"Freshman Academy Baker Cooler 1190120251","sensorType":"2","csNetID":1268},{"sensorID":1163134069,"sensorName":"Freshman Academy Main Cooler 1163134069 ","sensorType":"2","csNetID":1268},{"sensorID":1163134179,"sensorName":"Freshman Academy Main Freezer 1163134179","sensorType":"2","csNetID":1268},{"sensorID":1163134152,"sensorName":"Lynn Wood ES Cooler 1163134152 ","sensorType":"2","csNetID":1269},{"sensorID":1163133182,"sensorName":"Lynn Wood ES Freezer 1163133182 ","sensorType":"2","csNetID":1269},{"sensorID":1163138012,"sensorName":"Timber Ridge Cooler 1163138012 ","sensorType":"2","csNetID":1436},{"sensorID":1163139102,"sensorName":"Timber Ridge Freezer 1163139102 ","sensorType":"2","csNetID":1436},{"sensorID":1163133190,"sensorName":"Aspen Creek ES Cooler 1163133190 ","sensorType":"2","csNetID":1486},{"sensorID":1163137252,"sensorName":"Aspen Creek ES Freezer 1163137252 ","sensorType":"2","csNetID":1486},{"sensorID":1163133230,"sensorName":"Central Warehouse Cooler 1163133230 ","sensorType":"2","csNetID":1518},{"sensorID":1163139110,"sensorName":"Central Warehouse Freezer 1163139110 ","sensorType":"2","csNetID":1518}],"gateways":[{"gatewayID":1607990334,"name":"Base Station Oneta Ridge MS - 1607990334","gatewayType":"Base Station","csNetID":1231},{"gatewayID":1607990450,"name":"Base Station Rhoades ES - 1607990450","gatewayType":"Base Station","csNetID":1232},{"gatewayID":1607990335,"name":"Base Station Spring Creek ES - 1607990335","gatewayType":"Base Station","csNetID":1233},{"gatewayID":1611050619,"name":"Base Station Creekwood ES - 1611050619","gatewayType":"Base Station","csNetID":1234},{"gatewayID":1607990453,"name":"Base Station Childers MS - 1607990453","gatewayType":"Base Station","csNetID":1235},{"gatewayID":1607990278,"name":"Base Station Arrowhead ES - 1607990278","gatewayType":"Base Station","csNetID":1240},{"gatewayID":1607990494,"name":"Base Station Vandever ES - 1607990494","gatewayType":"Base Station","csNetID":1241},{"gatewayID":1607990281,"name":"Base Station Senior High School - 1607990281","gatewayType":"Base Station","csNetID":1242},{"gatewayID":1607990455,"name":"Base Station Highland Park ES - 1607990455","gatewayType":"Base Station","csNetID":1243},{"gatewayID":1605950532,"name":"Base Station Leisure Park ES - 1605950532","gatewayType":"Base Station","csNetID":1255},{"gatewayID":1607990460,"name":"Base Station Country Lane Primary ES - 1607990460","gatewayType":"Base Station","csNetID":1257},{"gatewayID":1607990288,"name":"Base Station Country Lane Intermediate - 1607990288","gatewayType":"Base Station","csNetID":1258},{"gatewayID":1067990495,"name":"Base Station Centennial MS - 1067990495","gatewayType":"Base Station","csNetID":1259},{"gatewayID":1067990502,"name":"Base Station Sequoyah MS - 1067990502","gatewayType":"Base Station","csNetID":1260},{"gatewayID":1607990282,"name":"Base Station Oliver MS  - 1607990282","gatewayType":"Base Station","csNetID":1261},{"gatewayID":1607990336,"name":"Base Station Alternative Academy - 1607990336","gatewayType":"Base Station","csNetID":1262},{"gatewayID":1067990292,"name":"Base Station Liberty ES - 1067990292","gatewayType":"Base Station","csNetID":1263},{"gatewayID":1607990242,"name":"Base Station Oak Crest ES - 1607990242","gatewayType":"Base Station","csNetID":1264},{"gatewayID":1607990500,"name":"Base Station ArrowSprings ES- 1607990500","gatewayType":"Base Station","csNetID":1265},{"gatewayID":1611050805,"name":"Base Station Park Lane ECC 1611050805","gatewayType":"Base Station","csNetID":1266},{"gatewayID":1607990352,"name":"Base Station Wolf Creek ES - 1607990352","gatewayType":"Base Station","csNetID":1267},{"gatewayID":1607990280,"name":"Base Station Freshman Academy  - 1607990280","gatewayType":"Base Station","csNetID":1268},{"gatewayID":1607990501,"name":"Base Station Lynn Wood ES - 1607990501","gatewayType":"Base Station","csNetID":1269},{"gatewayID":1605950534,"name":"Base Station Timber Ridge ES - 1605950534","gatewayType":"Base Station","csNetID":1436},{"gatewayID":1607990447,"name":"Base Station Aspen Creek ES - 1607990447","gatewayType":"Base Station","csNetID":1486},{"gatewayID":1607990283,"name":"Base Station Central Warehouse - 1607990283","gatewayType":"Base Station","csNetID":1518}],"users":[{"userID":227,"userName":"User227","name":"amy LastName","firstName":null,"lastName":null,"smsCarrierID":0,"directSMS":true,"recievesMaintenanceByEmail":true,"recievesMaintenanceBySMS":true,"recievesNotificaitonsBySMS":true,"recievesNotificaitonsByVoice":false,"voiceNumber":"","emailAddress":"Reclamationbin@gmail.com","smsNumber":"555-555-1234","admin":true,"networkPermissions":null},{"userID":229,"userName":"User229","name":"steve LastName","firstName":null,"lastName":null,"smsCarrierID":0,"directSMS":false,"recievesMaintenanceByEmail":false,"recievesMaintenanceBySMS":false,"recievesNotificaitonsBySMS":true,"recievesNotificaitonsByVoice":false,"voiceNumber":"","emailAddress":"Reclamationbin@gmail.com","smsNumber":"555-555-1234","admin":true,"networkPermissions":null},{"userID":230,"userName":"User230","name":"Lora LastName","firstName":null,"lastName":null,"smsCarrierID":0,"directSMS":false,"recievesMaintenanceByEmail":false,"recievesMaintenanceBySMS":false,"recievesNotificaitonsBySMS":false,"recievesNotificaitonsByVoice":false,"voiceNumber":"","emailAddress":"Reclamationbin@gmail.com","smsNumber":"555-555-1234","admin":true,"networkPermissions":null},{"userID":231,"userName":"User231","name":"Luanne LastName","firstName":null,"lastName":null,"smsCarrierID":0,"directSMS":true,"recievesMaintenanceByEmail":true,"recievesMaintenanceBySMS":true,"recievesNotificaitonsBySMS":true,"recievesNotificaitonsByVoice":false,"voiceNumber":"","emailAddress":"Reclamationbin@gmail.com","smsNumber":"555-555-1234","admin":true,"networkPermissions":null}],"paymentHistories":[{"id":10049,"stripeChargeID":"ch_1C6zXyESUgWDdX8xjsFbWiLi","type":"Online","productName":"NotifEye","customerID":72,"customerName":"User227","accountID":72,"accountName":"broken arrow public schools","oldRenewalDate":"2018-03-02","newRenewalDate":"2019-03-02","historyDate":"2018-03-18","subscriptionAmount":200.0,"taxString":"3","taxAmount":6.0,"totalAmount":206.0,"invoiceDownloadLink":"http://71.174.254.42:9080/api/payment/Invoice?PaymentHistoryID=10049"}]};
    
//     this.sensorList = [  
//    {  
//       "notification":{  
//          "notificationID":383,
//          "name":"Testing out of temp range",
//          "text":"Cooler out of temp range",
//          "notificationClass":"UnKnown",
//          "active":true,
//          "lastDateSent":"2018-01-09T19:26:25",
//          "threshold":0.0,
//          "comparer":"",
//          "snooze":60.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163132222,
//             "deviceName":"Leisure Park ES Cooler 1163132222 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163138000,
//             "deviceName":"Alternative Academy Cooler 1163138000 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163138012,
//             "deviceName":"Timber Ridge Cooler 1163138012 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":385,
//          "name":"Missed communication",
//          "text":"sensor has not reported in 15 minutes",
//          "notificationClass":"Inactivity",
//          "active":true,
//          "lastDateSent":"2018-01-09T16:56:29",
//          "threshold":180.0,
//          "comparer":"Greater Than",
//          "snooze":60.0,
//          "advancedNotificationID":0,
//          "advanceNotificationName":null,
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1067990292,
//             "deviceName":"Base Station Liberty ES - 1067990292",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1067990495,
//             "deviceName":"Base Station Centennial MS - 1067990495",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1067990502,
//             "deviceName":"Base Station Sequoyah MS - 1067990502",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1163132221,
//             "deviceName":" Country Lane Primary Freezer 1163132221",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163132222,
//             "deviceName":"Leisure Park ES Cooler 1163132222 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163132225,
//             "deviceName":"Country Lane Primary Cooler 1163132225 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163132226,
//             "deviceName":"Park Lane ECC Cooler 1163132226 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163132248,
//             "deviceName":"Sequoyah MS Freezer 1163132248 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133120,
//             "deviceName":" Country Lane Intermediate Cooler 1163133120",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133124,
//             "deviceName":"Sequoyah MS Cooler 1163133124 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133136,
//             "deviceName":"Creekwood ES Freezer 1163133136 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133152,
//             "deviceName":"Park Lane ECC Freezer 1163133152 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133156,
//             "deviceName":"Wolf Creek ES Freezer 1163133156 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133164,
//             "deviceName":"Highland Park ES Cooler 1163133164 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133182,
//             "deviceName":"Lynn Wood ES Freezer 1163133182 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133186,
//             "deviceName":"Arrow Springs ECC Cooler 1163133186",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133190,
//             "deviceName":"Aspen Creek ES Cooler 1163133190 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133230,
//             "deviceName":"Central Warehouse Cooler 1163133230 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133234,
//             "deviceName":"Leisure Park ES Freezer 1163133234 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134069,
//             "deviceName":"Freshman Academy Main Cooler 1163134069 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134086,
//             "deviceName":"Childers MS Freezer 1163134086 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134090,
//             "deviceName":"Oneta Ridge MS Freezer 1163134090 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134098,
//             "deviceName":"Childers MS Cooler 1163134098 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134144,
//             "deviceName":"Broken Arrow HS Baker Freezer 1163134144 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134148,
//             "deviceName":"Arrowhead ES Cooler 1163134148 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134152,
//             "deviceName":"Lynn Wood ES Cooler 1163134152 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134156,
//             "deviceName":"Vandever ES Freezer 1163134156  ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134160,
//             "deviceName":"Spring Creek ES Cooler 1163134160 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134164,
//             "deviceName":"Oak Crest ES Cooler 1163134164 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134175,
//             "deviceName":"Broken Arrow HS Main Freezer 1163134175 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134179,
//             "deviceName":"Freshman Academy Main Freezer 1163134179",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134205,
//             "deviceName":"Centennial MS Freezer 1163134205 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134213,
//             "deviceName":"Arrow Springs ECC Freezer 1163134213 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134217,
//             "deviceName":"Creekwood ES cooler 1163134217 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134226,
//             "deviceName":"Oak Crest ES Freezer 1163134226 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134230,
//             "deviceName":"Centennial MS Cooler 1163134230 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134238,
//             "deviceName":"Wolf Creek ES Cooler 1163134238 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134242,
//             "deviceName":"Liberty ES Cooler 1163134242 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134246,
//             "deviceName":"Highland Park ES Freezer 1163134246 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163135243,
//             "deviceName":"Alternative Academy Freezer 1163135243 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163137120,
//             "deviceName":"Broken Arrow HS Main Cooler 1163137120 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163137189,
//             "deviceName":"Rhoades ES Cooler 1163137189 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163137220,
//             "deviceName":"Country Lane Intermediate Freezer 1163137220 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163137248,
//             "deviceName":"Rhoades ES Freezer 1163137248 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163137252,
//             "deviceName":"Aspen Creek ES Freezer 1163137252 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163138000,
//             "deviceName":"Alternative Academy Cooler 1163138000 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163138004,
//             "deviceName":"Broken Arrow HS Baker Cooler 1163138004 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163138012,
//             "deviceName":"Timber Ridge Cooler 1163138012 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163138228,
//             "deviceName":"Oliver MS Freezer 1163138228 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163138246,
//             "deviceName":"Arrowhead ES Freezer 1163138246 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163139101,
//             "deviceName":"Spring Creek ES freezer 1163139101 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163139102,
//             "deviceName":"Timber Ridge Freezer 1163139102 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163139110,
//             "deviceName":"Central Warehouse Freezer 1163139110 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163139206,
//             "deviceName":"Liberty ES Freezer 1163139206 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163140048,
//             "deviceName":"Oliver MS Cooler 1163140048 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1190120251,
//             "deviceName":"Freshman Academy Baker Cooler 1190120251",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1191002169,
//             "deviceName":"Vandever ES Cooler 1191002169",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1605950532,
//             "deviceName":"Base Station Leisure Park ES - 1605950532",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1605950534,
//             "deviceName":"Base Station Timber Ridge ES - 1605950534",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1607990242,
//             "deviceName":"Base Station Oak Crest ES - 1607990242",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1607990278,
//             "deviceName":"Base Station Arrowhead ES - 1607990278",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1607990280,
//             "deviceName":"Base Station Freshman Academy  - 1607990280",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1607990281,
//             "deviceName":"Base Station Senior High School - 1607990281",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1607990282,
//             "deviceName":"Base Station Oliver MS  - 1607990282",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1607990283,
//             "deviceName":"Base Station Central Warehouse - 1607990283",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1607990288,
//             "deviceName":"Base Station Country Lane Intermediate - 1607990288",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1607990335,
//             "deviceName":"Base Station Spring Creek ES - 1607990335",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1607990336,
//             "deviceName":"Base Station Alternative Academy - 1607990336",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1607990352,
//             "deviceName":"Base Station Wolf Creek ES - 1607990352",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1607990447,
//             "deviceName":"Base Station Aspen Creek ES - 1607990447",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1607990450,
//             "deviceName":"Base Station Rhoades ES - 1607990450",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1607990453,
//             "deviceName":"Base Station Childers MS - 1607990453",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1607990455,
//             "deviceName":"Base Station Highland Park ES - 1607990455",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1607990460,
//             "deviceName":"Base Station Country Lane Primary ES - 1607990460",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1607990494,
//             "deviceName":"Base Station Vandever ES - 1607990494",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1607990496,
//             "deviceName":"Base Station Creekwood ES - 1607990496",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1607990500,
//             "deviceName":"Base Station ArrowSprings ES- 1607990500",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1607990501,
//             "deviceName":"Base Station Lynn Wood ES - 1607990501",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1611050619,
//             "deviceName":"Base Station Creekwood ES - 1611050619",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1611050805,
//             "deviceName":"Base Station Park Lane ECC 1611050805",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1132,
//          "name":"Freezer out of temp range",
//          "text":"Freezer out of temp range",
//          "notificationClass":"Advanced",
//          "active":true,
//          "lastDateSent":"2017-12-19T13:00:37.893",
//          "threshold":0.0,
//          "comparer":"",
//          "snooze":60.0,
//          "advancedNotificationID":14,
//          "advanceNotificationName":"Advanced Temperature",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163132221,
//             "deviceName":" Country Lane Primary Freezer 1163132221",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163132248,
//             "deviceName":"Sequoyah MS Freezer 1163132248 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133136,
//             "deviceName":"Creekwood ES Freezer 1163133136 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133152,
//             "deviceName":"Park Lane ECC Freezer 1163133152 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133182,
//             "deviceName":"Lynn Wood ES Freezer 1163133182 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133234,
//             "deviceName":"Leisure Park ES Freezer 1163133234 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134086,
//             "deviceName":"Childers MS Freezer 1163134086 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134090,
//             "deviceName":"Oneta Ridge MS Freezer 1163134090 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134144,
//             "deviceName":"Broken Arrow HS Baker Freezer 1163134144 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134156,
//             "deviceName":"Vandever ES Freezer 1163134156  ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134205,
//             "deviceName":"Centennial MS Freezer 1163134205 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134213,
//             "deviceName":"Arrow Springs ECC Freezer 1163134213 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134226,
//             "deviceName":"Oak Crest ES Freezer 1163134226 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134246,
//             "deviceName":"Highland Park ES Freezer 1163134246 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163135243,
//             "deviceName":"Alternative Academy Freezer 1163135243 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163137248,
//             "deviceName":"Rhoades ES Freezer 1163137248 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163137252,
//             "deviceName":"Aspen Creek ES Freezer 1163137252 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163138228,
//             "deviceName":"Oliver MS Freezer 1163138228 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163138246,
//             "deviceName":"Arrowhead ES Freezer 1163138246 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163139101,
//             "deviceName":"Spring Creek ES freezer 1163139101 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163139102,
//             "deviceName":"Timber Ridge Freezer 1163139102 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163139110,
//             "deviceName":"Central Warehouse Freezer 1163139110 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163139206,
//             "deviceName":"Liberty ES Freezer 1163139206 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":384,
//          "name":"Freezer out of temp range",
//          "text":"Freezer out of temp range",
//          "notificationClass":"Advanced",
//          "active":false,
//          "lastDateSent":"2017-09-18T13:48:59",
//          "threshold":0.0,
//          "comparer":"",
//          "snooze":60.0,
//          "advancedNotificationID":14,
//          "advanceNotificationName":"Advanced Temperature",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163132221,
//             "deviceName":" Country Lane Primary Freezer 1163132221",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163132248,
//             "deviceName":"Sequoyah MS Freezer 1163132248 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133136,
//             "deviceName":"Creekwood ES Freezer 1163133136 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133152,
//             "deviceName":"Park Lane ECC Freezer 1163133152 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133156,
//             "deviceName":"Wolf Creek ES Freezer 1163133156 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133160,
//             "deviceName":"Country Lane Primary Freezer 1163133160 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133182,
//             "deviceName":"Lynn Wood ES Freezer 1163133182 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133230,
//             "deviceName":"Central Warehouse Cooler 1163133230 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133234,
//             "deviceName":"Leisure Park ES Freezer 1163133234 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134086,
//             "deviceName":"Childers MS Freezer 1163134086 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134090,
//             "deviceName":"Oneta Ridge MS Freezer 1163134090 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134144,
//             "deviceName":"Broken Arrow HS Baker Freezer 1163134144 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134156,
//             "deviceName":"Vandever ES Freezer 1163134156  ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134175,
//             "deviceName":"Broken Arrow HS Main Freezer 1163134175 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134179,
//             "deviceName":"Freshman Academy Main Freezer 1163134179",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134205,
//             "deviceName":"Centennial MS Freezer 1163134205 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134213,
//             "deviceName":"Arrow Springs ECC Freezer 1163134213 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134226,
//             "deviceName":"Oak Crest ES Freezer 1163134226 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134246,
//             "deviceName":"Highland Park ES Freezer 1163134246 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163135243,
//             "deviceName":"Alternative Academy Freezer 1163135243 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163137220,
//             "deviceName":"Country Lane Intermediate Freezer 1163137220 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163137248,
//             "deviceName":"Rhoades ES Freezer 1163137248 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163137252,
//             "deviceName":"Aspen Creek ES Freezer 1163137252 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163138228,
//             "deviceName":"Oliver MS Freezer 1163138228 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163138246,
//             "deviceName":"Arrowhead ES Freezer 1163138246 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163139101,
//             "deviceName":"Spring Creek ES freezer 1163139101 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163139206,
//             "deviceName":"Liberty ES Freezer 1163139206 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":379,
//          "name":"Out of temp range",
//          "text":"Out of temp range",
//          "notificationClass":"Advanced",
//          "active":false,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":0.0,
//          "comparer":"",
//          "snooze":60.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163132221,
//             "deviceName":" Country Lane Primary Freezer 1163132221",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163132222,
//             "deviceName":"Leisure Park ES Cooler 1163132222 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163132225,
//             "deviceName":"Country Lane Primary Cooler 1163132225 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163132226,
//             "deviceName":"Park Lane ECC Cooler 1163132226 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163132248,
//             "deviceName":"Sequoyah MS Freezer 1163132248 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133120,
//             "deviceName":" Country Lane Intermediate Cooler 1163133120",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133124,
//             "deviceName":"Sequoyah MS Cooler 1163133124 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133136,
//             "deviceName":"Creekwood ES Freezer 1163133136 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133152,
//             "deviceName":"Park Lane ECC Freezer 1163133152 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133156,
//             "deviceName":"Wolf Creek ES Freezer 1163133156 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133164,
//             "deviceName":"Highland Park ES Cooler 1163133164 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133182,
//             "deviceName":"Lynn Wood ES Freezer 1163133182 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133186,
//             "deviceName":"Arrow Springs ECC Cooler 1163133186",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133190,
//             "deviceName":"Aspen Creek ES Cooler 1163133190 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163133234,
//             "deviceName":"Leisure Park ES Freezer 1163133234 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134069,
//             "deviceName":"Freshman Academy Main Cooler 1163134069 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134086,
//             "deviceName":"Childers MS Freezer 1163134086 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134090,
//             "deviceName":"Oneta Ridge MS Freezer 1163134090 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134098,
//             "deviceName":"Childers MS Cooler 1163134098 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134144,
//             "deviceName":"Broken Arrow HS Baker Freezer 1163134144 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134148,
//             "deviceName":"Arrowhead ES Cooler 1163134148 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134152,
//             "deviceName":"Lynn Wood ES Cooler 1163134152 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134156,
//             "deviceName":"Vandever ES Freezer 1163134156  ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134160,
//             "deviceName":"Spring Creek ES Cooler 1163134160 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134164,
//             "deviceName":"Oak Crest ES Cooler 1163134164 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134175,
//             "deviceName":"Broken Arrow HS Main Freezer 1163134175 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134179,
//             "deviceName":"Freshman Academy Main Freezer 1163134179",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134205,
//             "deviceName":"Centennial MS Freezer 1163134205 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134213,
//             "deviceName":"Arrow Springs ECC Freezer 1163134213 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134217,
//             "deviceName":"Creekwood ES cooler 1163134217 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134226,
//             "deviceName":"Oak Crest ES Freezer 1163134226 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134230,
//             "deviceName":"Centennial MS Cooler 1163134230 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134238,
//             "deviceName":"Wolf Creek ES Cooler 1163134238 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134242,
//             "deviceName":"Liberty ES Cooler 1163134242 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134246,
//             "deviceName":"Highland Park ES Freezer 1163134246 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163135243,
//             "deviceName":"Alternative Academy Freezer 1163135243 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163137120,
//             "deviceName":"Broken Arrow HS Main Cooler 1163137120 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163137189,
//             "deviceName":"Rhoades ES Cooler 1163137189 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163137248,
//             "deviceName":"Rhoades ES Freezer 1163137248 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163137252,
//             "deviceName":"Aspen Creek ES Freezer 1163137252 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163138000,
//             "deviceName":"Alternative Academy Cooler 1163138000 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163138004,
//             "deviceName":"Broken Arrow HS Baker Cooler 1163138004 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163138228,
//             "deviceName":"Oliver MS Freezer 1163138228 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163138246,
//             "deviceName":"Arrowhead ES Freezer 1163138246 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163139101,
//             "deviceName":"Spring Creek ES freezer 1163139101 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163139206,
//             "deviceName":"Liberty ES Freezer 1163139206 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163140048,
//             "deviceName":"Oliver MS Cooler 1163140048 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":380,
//          "name":"Out of temp range",
//          "text":"Out of temp range",
//          "notificationClass":"Advanced",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":0.0,
//          "comparer":"",
//          "snooze":60.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163133136,
//             "deviceName":"Creekwood ES Freezer 1163133136 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134086,
//             "deviceName":"Childers MS Freezer 1163134086 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134098,
//             "deviceName":"Childers MS Cooler 1163134098 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134160,
//             "deviceName":"Spring Creek ES Cooler 1163134160 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134217,
//             "deviceName":"Creekwood ES cooler 1163134217 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163137189,
//             "deviceName":"Rhoades ES Cooler 1163137189 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163137248,
//             "deviceName":"Rhoades ES Freezer 1163137248 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163139101,
//             "deviceName":"Spring Creek ES freezer 1163139101 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":382,
//          "name":"Refrigerator out of temp range",
//          "text":"Refrigerator out of temp range",
//          "notificationClass":"Advanced",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":0.0,
//          "comparer":"",
//          "snooze":60.0,
//          "advancedNotificationID":14,
//          "advanceNotificationName":"Advanced Temperature",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163134098,
//             "deviceName":"Childers MS Cooler 1163134098 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134160,
//             "deviceName":"Spring Creek ES Cooler 1163134160 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134217,
//             "deviceName":"Creekwood ES cooler 1163134217 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163137189,
//             "deviceName":"Rhoades ES Cooler 1163137189 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":428,
//          "name":"cooler out of range",
//          "text":"cooler out of range",
//          "notificationClass":"Advanced",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":0.0,
//          "comparer":"",
//          "snooze":60.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163133194,
//             "deviceName":"Vandever ES Cooler 1163133194 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134148,
//             "deviceName":"Arrowhead ES Cooler 1163134148 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134230,
//             "deviceName":"Centennial MS Cooler 1163134230 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163137120,
//             "deviceName":"Broken Arrow HS Main Cooler 1163137120 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163138004,
//             "deviceName":"Broken Arrow HS Baker Cooler 1163138004 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163138012,
//             "deviceName":"Timber Ridge Cooler 1163138012 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":429,
//          "name":"freezer out of range",
//          "text":"freezer out of range",
//          "notificationClass":"Advanced",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":0.0,
//          "comparer":"",
//          "snooze":60.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163134144,
//             "deviceName":"Broken Arrow HS Baker Freezer 1163134144 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134175,
//             "deviceName":"Broken Arrow HS Main Freezer 1163134175 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163134205,
//             "deviceName":"Centennial MS Freezer 1163134205 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163138246,
//             "deviceName":"Arrowhead ES Freezer 1163138246 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163139102,
//             "deviceName":"Timber Ridge Freezer 1163139102 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1661,
//          "name":"New Sample Jignesh Notification",
//          "text":"New Sample Jignesh Notification",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":55.0,
//          "comparer":"Equal",
//          "snooze":0.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163135243,
//             "deviceName":"Alternative Academy Freezer 1163135243 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163138000,
//             "deviceName":"Alternative Academy Cooler 1163138000 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990278,
//             "deviceName":"Base Station Arrowhead ES - 1607990278",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1607990336,
//             "deviceName":"Base Station Alternative Academy - 1607990336",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1662,
//          "name":"New Sample Jignesh1 Notification",
//          "text":"New Sample Jignesh1 Notification",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":55.0,
//          "comparer":"Equal",
//          "snooze":0.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163135243,
//             "deviceName":"Alternative Academy Freezer 1163135243 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163138000,
//             "deviceName":"Alternative Academy Cooler 1163138000 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990278,
//             "deviceName":"Base Station Arrowhead ES - 1607990278",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1607990336,
//             "deviceName":"Base Station Alternative Academy - 1607990336",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1664,
//          "name":"New Sample Jignesh2 Notification",
//          "text":"New Sample Jignesh2 Notification",
//          "notificationClass":"Application",
//          "active":false,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":55.0,
//          "comparer":"Less Than",
//          "snooze":0.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163135243,
//             "deviceName":"Alternative Academy Freezer 1163135243 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163138000,
//             "deviceName":"Alternative Academy Cooler 1163138000 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990336,
//             "deviceName":"Base Station Alternative Academy - 1607990336",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          },
//          {  
//             "deviceID":1607990500,
//             "deviceName":"Base Station ArrowSprings ES- 1607990500",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1665,
//          "name":"Update Application Notification",
//          "text":"Update Application Notification",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":60.0,
//          "comparer":"Greater Than",
//          "snooze":0.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163134069,
//             "deviceName":"Freshman Academy Main Cooler 1163134069 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990336,
//             "deviceName":"Base Station Alternative Academy - 1607990336",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1666,
//          "name":"Battery Update Notification",
//          "text":"Battery Update Notification",
//          "notificationClass":"Low Battery",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":40.0,
//          "comparer":"Less Than",
//          "snooze":0.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163135243,
//             "deviceName":"Alternative Academy Freezer 1163135243 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1163138004,
//             "deviceName":"Broken Arrow HS Baker Cooler 1163138004 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990336,
//             "deviceName":"Base Station Alternative Academy - 1607990336",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1667,
//          "name":"Inactivity Test JKM Notification",
//          "text":"Inactivity Test JKM Notification",
//          "notificationClass":"Inactivity",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":240.0,
//          "comparer":"Equal",
//          "snooze":0.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163138000,
//             "deviceName":"Alternative Academy Cooler 1163138000 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990336,
//             "deviceName":"Base Station Alternative Academy - 1607990336",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1668,
//          "name":"Hemanth Test 1",
//          "text":"Hemanth Text2",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":40.0,
//          "comparer":"Less Than",
//          "snooze":0.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1669,
//          "name":"Hemanth Test 1",
//          "text":"Hemanth Text2",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":40.0,
//          "comparer":"Less Than",
//          "snooze":0.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1670,
//          "name":"Hemanth Test 1",
//          "text":"Hemanth Text2",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":40.0,
//          "comparer":"Less Than",
//          "snooze":0.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1671,
//          "name":"Hemanth Test 1",
//          "text":"Hemanth Text2",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":40.0,
//          "comparer":"Less Than",
//          "snooze":0.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1672,
//          "name":"Hemanth Test 1",
//          "text":"Hemanth Text2",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":40.0,
//          "comparer":"Less Than",
//          "snooze":0.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1673,
//          "name":"Hemanth Test 1",
//          "text":"Hemanth Text2",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":40.0,
//          "comparer":"Less Than",
//          "snooze":0.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1674,
//          "name":"Hemanth Test 1",
//          "text":"Hemanth Text2",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":40.0,
//          "comparer":"Less Than",
//          "snooze":0.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1675,
//          "name":"Hemanth Test 1",
//          "text":"Hemanth Text2",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":40.0,
//          "comparer":"Less Than",
//          "snooze":0.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1676,
//          "name":"hemantn test one",
//          "text":"hemanth text one",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":1.0,
//          "comparer":"Less Than",
//          "snooze":0.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990450,
//             "deviceName":"Base Station Rhoades ES - 1607990450",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1677,
//          "name":"Test  Schedule Notification12",
//          "text":"test",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":0.0,
//          "comparer":"Less Than",
//          "snooze":60.0,
//          "advancedNotificationID":0,
//          "advanceNotificationName":null,
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163132221,
//             "deviceName":" Country Lane Primary Freezer 1163132221",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1678,
//          "name":"Hemanth Trial Text2",
//          "text":"Hemanth Trial Text2",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":40.0,
//          "comparer":"Less Than",
//          "snooze":0.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1681,
//          "name":"Hemanth Trial Text2",
//          "text":"Hemanth Trial JKM Text2",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":40.0,
//          "comparer":"Less Than",
//          "snooze":60.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1682,
//          "name":"JKM JKM",
//          "text":"JKM JKKM",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":40.0,
//          "comparer":"Less Than",
//          "snooze":60.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1683,
//          "name":"Notification Battery ",
//          "text":"Notification Battery ",
//          "notificationClass":"Low Battery",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":1.0,
//          "comparer":"Less Than",
//          "snooze":0.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1684,
//          "name":"JKM JKM",
//          "text":"JKM JKKM1",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":40.0,
//          "comparer":"Less Than",
//          "snooze":60.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1685,
//          "name":"JKM JKM2",
//          "text":"JKM JKKM2",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":40.0,
//          "comparer":"Less Than",
//          "snooze":64.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1686,
//          "name":"Inactive Test Hemanth",
//          "text":"Inactive Test Hemanth",
//          "notificationClass":"Inactivity",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":365.0,
//          "comparer":"Equal",
//          "snooze":0.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1687,
//          "name":"Inactive Test  editedHemanth",
//          "text":"Inactive Test  dited  Hemanth",
//          "notificationClass":"Inactivity",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":365.0,
//          "comparer":"Equal",
//          "snooze":60.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990450,
//             "deviceName":"Base Station Rhoades ES - 1607990450",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1688,
//          "name":"Inactive Notification Test change",
//          "text":"Inactive Notification Test change",
//          "notificationClass":"Inactivity",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":200.0,
//          "comparer":"Equal",
//          "snooze":60.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163134090,
//             "deviceName":"Oneta Ridge MS Freezer 1163134090 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990450,
//             "deviceName":"Base Station Rhoades ES - 1607990450",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1689,
//          "name":"Inactive 4",
//          "text":"Inactive 4",
//          "notificationClass":"Inactivity",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":1.0,
//          "comparer":"Equal",
//          "snooze":40.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1690,
//          "name":"Application Temp Test Hemanth",
//          "text":"Application Temp Test Hemanth",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":60.0,
//          "comparer":"Less Than",
//          "snooze":30.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1692,
//          "name":"Humidty Notification Hemanth1",
//          "text":"Humidty Notification Hemanth1",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":40.0,
//          "comparer":"Less Than",
//          "snooze":60.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1693,
//          "name":"open close notification",
//          "text":"open close notification",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":0.0,
//          "comparer":"Equal",
//          "snooze":40.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1694,
//          "name":"open close 2",
//          "text":"open close 2",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":1.0,
//          "comparer":"Equal",
//          "snooze":40.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1695,
//          "name":"humidity Test 3",
//          "text":"humidity Test 3",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":40.0,
//          "comparer":"Greater Than",
//          "snooze":60.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1696,
//          "name":"OPen Close 3",
//          "text":"Open close 3",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":0.0,
//          "comparer":"Equal",
//          "snooze":40.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1702,
//          "name":"Humdity 4",
//          "text":"Humidity 4",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":40.0,
//          "comparer":"Less Than",
//          "snooze":30.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163134090,
//             "deviceName":"Oneta Ridge MS Freezer 1163134090 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990450,
//             "deviceName":"Base Station Rhoades ES - 1607990450",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1705,
//          "name":"test 3",
//          "text":"test 3",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":0.0,
//          "comparer":"Equal",
//          "snooze":50.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137189,
//             "deviceName":"Rhoades ES Cooler 1163137189 ",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990335,
//             "deviceName":"Base Station Spring Creek ES - 1607990335",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1708,
//          "name":"JKM JKM2",
//          "text":"JKM JKKM2",
//          "notificationClass":"Application",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":40.0,
//          "comparer":"Less Than",
//          "snooze":64.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    },
//    {  
//       "notification":{  
//          "notificationID":1709,
//          "name":"JKM JKM2",
//          "text":"JKM JKKM2",
//          "notificationClass":"Advanced",
//          "active":true,
//          "lastDateSent":"0001-01-01T00:00:00",
//          "threshold":40.0,
//          "comparer":"Less Than",
//          "snooze":64.0,
//          "advancedNotificationID":1,
//          "advanceNotificationName":"Notify after aware period",
//          "advancedNotificationType":null
//       },
//       "devices":[  
//          {  
//             "deviceID":1163137205,
//             "deviceName":"Back Cooler Jig",
//             "deviceType":"Temperature",
//             "deviceCategory":"Sensor"
//          },
//          {  
//             "deviceID":1607990334,
//             "deviceName":"Base Station Oneta Ridge MS - 1607990334",
//             "deviceType":"Base Station",
//             "deviceCategory":"Gateway"
//          }
//       ],
//       "users":[  
//          {  
//             "userID":227,
//             "userName":"amy LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          },
//          {  
//             "userID":229,
//             "userName":"steve LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":230,
//             "userName":"Lora LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":false,
//             "notifyThroughPhone":false
//          },
//          {  
//             "userID":231,
//             "userName":"Luanne LastName",
//             "smsNumber":"555-555-1234",
//             "email":"Reclamationbin@gmail.com",
//             "notifyThroughEmail":true,
//             "notifyThroughPhone":true
//          }
//       ]
//    }
// ];
    
//  this.isValidForm = true;
    this.sensorSummaryService.getGlobalNotificationsList(this.accountID).then((result) => {
      console.log('globalNotificationsList----->',result);
       this.globalNotificationsList = result;
      
      this.getNotificationsList();
       
    });
  }

  getNotificationsList(){
    this.isValidForm = false;
       this.sensorSummaryService.getNotificationSettingsDetails(this.accountID).then((result) => {
          this.sensorList = result;

            this.isValidForm = true;
        });
  }

   onClickAddNotification() {
    this.notificationRadio = 'addNotify';
    this.isAddButtonRequired = false;
    this.isResetButtonRequired = true;
    this.notifyOperationType = 'addNotify';
    
  }
  onClickResetNotification() {
    this.isAddButtonRequired = true;
    this.isResetButtonRequired = false;
    this.notificationRadio = 'summary';
  }

 recieveEditNotifyValue($event) {
   
    this.notificationRadio = 'addNotify';
    this.notifyOperationType = 'editNotify';
    this.isAddButtonRequired = false;
    this.isResetButtonRequired = true;
    this.editNotifyObject = $event;

  }
   receiveAddNotificationMessage($event) {
    console.log($event);
    this.notificationRadio = 'summary';
     this.isAddButtonRequired = true;
    this.isResetButtonRequired = false;

     this.getNotificationsList();


  }

}
