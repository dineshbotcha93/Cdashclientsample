import { Injectable } from '@angular/core';

import { UserManagementForm } from './user-manage.model';

@Injectable()
export class UserManagementService {

  constructor() { }


  public getEmailVerification(userRegisterModel : UserManagementForm): boolean {

  return true;

  }

}
