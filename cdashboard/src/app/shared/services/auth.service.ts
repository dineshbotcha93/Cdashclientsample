import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequesterService } from '../../shared/services/requester.service';
import { SERVICE_CONSTANTS } from '../../shared/constants/service.constants';

@Injectable()
export class AuthService {
  constructor(private requesterService:RequesterService) {
    this.requesterService = requesterService;
  }

  public isAuthenticated(): Promise<boolean> {

    const token = localStorage.getItem('token');

    // Check whether the token is expired and return
    // true or false
    return this.requesterService.get(SERVICE_CONSTANTS.GET_AUTH_USERS.live);
  }

}
