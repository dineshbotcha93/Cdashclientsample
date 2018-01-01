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
      console.log('finalized path');
      console.log(finalizedPath);
      switch (finalizedPath){
        case SERVICE_CONSTANTS.GET_HEROES_LIST.path:
          URL = 'http://localhost:4200'+SERVICE_CONSTANTS.GET_HEROES_LIST.path;
          body = SERVICE_CONSTANTS.GET_HEROES_LIST.mock;
        break;
        case SERVICE_CONSTANTS.GET_AUTH_USERS.path:
          URL = 'http://localhost:4200'+SERVICE_CONSTANTS.GET_AUTH_USERS.path;
          body = SERVICE_CONSTANTS.GET_AUTH_USERS.mock;
        break;
        case SERVICE_CONSTANTS.GET_LOCATION_ONE.path:
          URL = 'http://localhost:4200'+SERVICE_CONSTANTS.GET_LOCATION_ONE.path;
          body = SERVICE_CONSTANTS.GET_LOCATION_ONE.mock;
        break;
        case SERVICE_CONSTANTS.GET_LOCATION_TWO.path:
          URL = 'http://localhost:4200'+SERVICE_CONSTANTS.GET_LOCATION_TWO.path;
          body = SERVICE_CONSTANTS.GET_LOCATION_TWO.mock;
        break;
        case SERVICE_CONSTANTS.GET_LOCATION_THREE.path:
          URL = 'http://localhost:4200'+SERVICE_CONSTANTS.GET_LOCATION_THREE.path;
          body = SERVICE_CONSTANTS.GET_LOCATION_THREE.mock;
        break;
        case SERVICE_CONSTANTS.GET_LOCATION_FOUR.path:
          URL = 'http://localhost:4200'+SERVICE_CONSTANTS.GET_LOCATION_FOUR.path;
          body = SERVICE_CONSTANTS.GET_LOCATION_FOUR.mock;
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
