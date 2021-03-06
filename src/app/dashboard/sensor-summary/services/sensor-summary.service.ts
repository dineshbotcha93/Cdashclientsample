import { RequesterService } from '../../../shared/services/requester.service';
import { Injectable } from '@angular/core';
import { SERVICE_CONSTANTS } from '../../../shared/constants/service.constants';
import { SERVER_URLS } from '../../../shared/constants/serverUrl.constants';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

@Injectable()
export class SensorSummaryService {
  data:String[] = [];
  constructor(private requesterService:RequesterService,
              private http: HttpClient) {
  }
  getData(location){
    switch(location){
      case 'I001':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_ONE.live);
      case 'I002':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_TWO.live);
      case 'I003':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_THREE.live);
      case 'I004':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_FOUR.live);
      case 'I005':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_FIVE.live);
      case 'I006':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_SIX.live);
      case 'I007':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_SEVEN.live);
      case 'I008':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_EIGHT.live);
      case 'I009':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_NINE.live);
      case 'I010':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_TEN.live);
      case 'I011':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_ELEVEN.live);
      case 'I012':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_TWELVE.live);
      case 'I013':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_THIRTEEN.live);
      case 'I014':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_FOURTEEN.live);
      case 'I015':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_FIFTEEN.live);
      case 'I016':
      return this.requesterService.get(SERVICE_CONSTANTS.GET_LOCATION_SIXTEEN.live);
      default:
      break;
    }
  }

  getNetworkLocations(){
    return this.requesterService
    .getExternalRequest('/api/Network');
  }

  getSingleUserLocation(id){
    return this.requesterService
    .getExternalRequest("/api/Location/LocationDetails/"+id);
  }

  getRealData(){
    return this.requesterService
    .getExternalRequest('/api/Location/UserLocations');
  }

  /* Edit the gateway details*/
  updateGatewayDetails(gatewayObj:Array<any>){
    /*Place a mock call and return response*/

     return this.requesterService
    .putExternalRequest('/api/Gateway/BulkUpdate',gatewayObj);
  }

  /* Edit the Sensor details*/
  updateSensorDetails(sensorObj:Array<any>){
    /*Place a mock call and return response*/
    return this.requesterService
    .putExternalRequest('/api/Sensor/BulkUpdate',sensorObj);

  }

  /* Remove  the gateway details*/
  removeGatewayDetails(id: string,network:string){
    /*Place a mock call and return response*/
    // return this.http.post('http://jsonplaceholder.typicode.com/posts', gatewayObj);
  }

  deleteGateway(id){
    return this.requesterService
    .deleteExternalRequest('/api/Gateway/Remove/'+id);
  }

  /* Remove  the sensor details*/
  removeSensorDetails(sensorObj:Array<any>){
    /*Place a mock call and return response*/
    return this.http.post('http://jsonplaceholder.typicode.com/posts', sensorObj);
  }

  deleteSensor(id){
    return this.requesterService
    .deleteExternalRequest('/api/Sensor/'+id+'/Remove');
  }

   /* Move  the gateway details*/
  moveSensorDetails(moveSensorObj){
    /*Place a mock call and return response*/
      const URL = '/api/Sensor/BulkAssignTo';
     // +'&CheckDigit=AAA';
     // +'/CheckDigit='+CheckDigit;
    console.log('URL----',URL);
     return this.requesterService
    .putExternalRequest(URL,moveSensorObj);
  }

    moveGatewayDetails(moveGatewayObj){
    /*Place a mock call and return response*/
      const URL = '/api/Gateway/BulkAssignTo';
     // +'&CheckDigit=AAA';
     // +'/CheckDigit='+CheckDigit;
    console.log('URL----',URL);
     return this.requesterService
    .putExternalRequest(URL,moveGatewayObj);
  }

  getSentNotificationsDetails(requestObject:any){
    // let URL = '/api/Notification/SentToNetwork?StartIndex=1&Count=100&FromDate='+requestObject.fromDate+'&ToDate='+requestObject.toDate;
    let URL = '/api/Notification/SentToSensor?StartIndex=1&Count=100&FromDate='+requestObject.fromDate+'&ToDate='+requestObject.toDate;
    return this.requesterService
    .getExternalRequest(URL);
  }

  getNotificationSettingsDetails(accountID:string){
    // return this.requesterService
    // .getExternalRequest('/api/Notification/NetworkNotifications?StartIndex=1&Count=2&NetworkID='+networkId);

    return this.requesterService
    .getExternalRequest('/api/Notification/AccountNotifications?StartIndex=1&Count=2000&AccountID='+accountID);



  }

  updateNotificationActiveState(requestObject:any){
    console.log(requestObject);
    let URL = '/api/Notification/ToggleNotification?NotificationID='+requestObject.NotificationID+'&On='+requestObject.On;
    return this.requesterService
    .putExternalRequest(URL,{});
  }

  createNotificationDetails(requestObject:any){
     let URL = '/api/Notification';
    return this.requesterService
    .postExternalRequest(URL,requestObject);
  }

   UpdateNotificationDetails(requestObject:any){
     let URL = '/api/Notification';
    return this.requesterService
    .putExternalRequest(URL,requestObject);
  }

  getNotificationScheduleList(networkID:string){
     let URL = '/api/Notification/ScheduleList?NotificationID='+networkID;
    return this.requesterService
    .getExternalRequest(URL);
  }

  createNetwork(postData){
    return this.requesterService
      .postExternalRequest('/api/Network', postData);
  }

  updateNetwork(putData){
    return this.requesterService
      .putExternalRequest('/api/Network', putData);
  }
  getGlobalNotificationsList(accountID:string) {
     return this.requesterService.getExternalRequest('/api/Account/'+accountID+'/Details');
  }

  updateSensorScale(putData){
    return this.requesterService
      .putExternalRequest('/api/Sensor/UpdateAttribute', putData);
  }
}
