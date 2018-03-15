import { Injectable } from '@angular/core';
import { UserManagementForm } from './user-manage.model';
import { RequesterService } from '../shared/services/requester.service';

@Injectable()
export class UserManagementService {
  constructor(private requesterService: RequesterService) {

  }

  /*Email verification for registration*/
  public getEmailVerification(userRegisterModel : UserManagementForm): any {
    return this.requesterService
    .getExternalRequest('/api/User/SendRegisterationLink?Email='+userRegisterModel.email);
  }

  public userRegistration(userRegisterModel : UserManagementForm): boolean{
    return true;
  }

  public registerNotifEyeUser(userRegisterModel: UserManagementForm): Promise<any> {
    return this.requesterService.postExternalRequest('/api/User/RegisterNotifEyeUser', userRegisterModel);
  }

  public userDetailsUpdation(userRegisterModel : UserManagementForm): boolean{
    return true;
  }
}
