import { Injectable } from '@angular/core';
import { UserManagementForm } from './user-manage.model';
import { RequesterService } from '../shared/services/requester.service';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserManagementService {
  private userCreationData = null;
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

  public registerNewMaster(userRegistrationData: any, registrationToken: string): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'RegistrationToken': registrationToken
    });

    console.log('sending user data', userRegistrationData);
    console.log('registration token', registrationToken);


    return this.requesterService.postExternalRequestWithHeaders('/api/User/RegisterNewUser', userRegistrationData, headers);
  }

  public registerExistingNotifEyeUser(userRegisterModel: any, registrationToken: string): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'RegistrationToken': registrationToken
    });

    return this.requesterService.postExternalRequestWithHeaders('/api/User/RegisterNotifEyeUser', userRegisterModel, headers);
  }

  public userDetailsUpdation(userRegisterModel: UserManagementForm): boolean {
    return true;
  }

  public saveRegistrationData(userData: any): void {
    this.userCreationData = userData;
  }

  public getRegistrationData(): any {
    return this.userCreationData;
  }

  public resetPassword(emailId) {
    return this.requesterService.putExternalRequest('/api/User/ResetPassword?Email=' + emailId, emailId);
  }
}
