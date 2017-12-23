import {Injectable} from "@angular/core";
import {MockBackend, MockConnection} from "@angular/http/testing";
import { SERVICE_CONSTANTS } from '../shared/constants/service.constants';
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
      let datas = c.request.url.split('/')[3];
      switch (datas){
        case SERVICE_CONSTANTS.GET_HEROES_LIST.path:
        URL = 'http://localhost:4200/'+SERVICE_CONSTANTS.GET_HEROES_LIST.path;
        body = SERVICE_CONSTANTS.GET_HEROES_LIST.mock;
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
