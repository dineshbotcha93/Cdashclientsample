import { Injectable } from '@angular/core';

import { RegisterForm } from '../models/auth/register.model';

@Injectable()
export class UserManagementService {

  constructor() { }


  public getEmailVerification(registerForm : RegisterForm): boolean {

  return true;

  }

}
