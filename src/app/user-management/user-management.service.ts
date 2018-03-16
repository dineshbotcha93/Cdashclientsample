import { Injectable } from '@angular/core';
import { UserManagementForm } from './user-manage.model';
import { RequesterService } from '../shared/services/requester.service';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserManagementService {
  constructor(private requesterService: RequesterService) {

  }

  /*Email verification for registration*/
  public getEmailVerification(userRegisterModel: UserManagementForm): any {
    return this.requesterService
    .getExternalRequest('/api/User/SendRegisterationLink?Email=' + userRegisterModel.email);
  }

  public userRegistration(userRegisterModel: UserManagementForm): boolean {
    return true;
  }

  public registerExistingNotifEyeUser(userRegisterModel: any, registrationToken: string): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'RegistrationToken': registrationToken
    });
    console.log('headers', headers);
    return this.requesterService.postExternalRequestWithHeaders('/api/User/RegisterNotifEyeUser', userRegisterModel, headers);
  }

  public userDetailsUpdation(userRegisterModel: UserManagementForm): boolean{
    return true;
  }
}
