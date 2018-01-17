import {Injectable} from "@angular/core";
import {MockBackend, MockConnection} from "@angular/http/testing";
import { SERVICE_CONSTANTS } from '../app/shared/constants/service.constants';
import {ResponseOptions, Response} from "@angular/http";

@Injectable()
export class MockBackendService {
  constructor(
    private backend: MockBackend
  ) {}

  start(): void {
    this.backend.connections.subscribe((c: MockConnection) => {
      let URL;
      let body;
      let datas = c.request.url.split('/');
      let finalizedPath = '';
      for(var i = 3;i<datas.length;i++){
        finalizedPath+= '/'+datas[i];
      }
      let baseOrigin = window.location.origin;
      switch (finalizedPath){
        case SERVICE_CONSTANTS.GET_HEROES_LIST.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_HEROES_LIST.path;
        body = SERVICE_CONSTANTS.GET_HEROES_LIST.mock;
      break;
        case SERVICE_CONSTANTS.GET_AUTH_USERS.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_AUTH_USERS.path;
        body = SERVICE_CONSTANTS.GET_AUTH_USERS.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_ONE.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_ONE.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_ONE.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_TWO.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_TWO.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_TWO.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_THREE.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_THREE.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_THREE.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_FOUR.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_FOUR.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_FOUR.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_FIVE.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_FIVE.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_FIVE.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_SIX.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_SIX.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_SIX.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_SEVEN.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_SEVEN.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_SEVEN.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_EIGHT.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_EIGHT.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_EIGHT.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_NINE.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_NINE.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_NINE.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_TEN.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_TEN.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_TEN.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_ELEVEN.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_ELEVEN.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_ELEVEN.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_TWELVE.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_TWELVE.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_TWELVE.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_THIRTEEN.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_THIRTEEN.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_THIRTEEN.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_FOURTEEN.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_FOURTEEN.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_FOURTEEN.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_FIFTEEN.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_FIFTEEN.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_FIFTEEN.mock;
      break;
        case SERVICE_CONSTANTS.GET_LOCATION_SIXTEEN.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_LOCATION_SIXTEEN.path;
        body = SERVICE_CONSTANTS.GET_LOCATION_SIXTEEN.mock;
      break;
        case SERVICE_CONSTANTS.GET_SENSOR_DETAIL.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_SENSOR_DETAIL.path;
        body = SERVICE_CONSTANTS.GET_SENSOR_DETAIL.mock;
      break;
        case SERVICE_CONSTANTS.GET_SENSOR_DETAIL_ONE.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_SENSOR_DETAIL_ONE.path;
        body = SERVICE_CONSTANTS.GET_SENSOR_DETAIL_ONE.mock;
      break;
        case SERVICE_CONSTANTS.GET_SENSOR_DETAIL_TWO.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_SENSOR_DETAIL_TWO.path;
        body = SERVICE_CONSTANTS.GET_SENSOR_DETAIL_TWO.mock;
      break;
        case SERVICE_CONSTANTS.GET_SENSOR_DETAIL_THREE.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_SENSOR_DETAIL_THREE.path;
        body = SERVICE_CONSTANTS.GET_SENSOR_DETAIL_THREE.mock;
      break;
        case SERVICE_CONSTANTS.GET_SENSOR_DETAIL_FOUR.path:
        URL = baseOrigin+SERVICE_CONSTANTS.GET_SENSOR_DETAIL_FOUR.path;
        body = SERVICE_CONSTANTS.GET_SENSOR_DETAIL_FOUR.mock;
      break;
        default:
        break;
      }
      if (c.request.url === URL && c.request.method === 0) {
        c.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(body)
        })));
      }
    });
  }
}
