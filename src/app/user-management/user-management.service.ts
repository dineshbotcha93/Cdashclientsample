import { Injectable } from '@angular/core';
import { UserManagementForm } from './user-manage.model';
@Injectable()
export class UserManagementService {
constructor() { }

/*Email verification for registration*/
public getEmailVerification(userRegisterModel : UserManagementForm): boolean {
return true;
}

public userRegistration(userRegisterModel : UserManagementForm): boolean{
return true;
}

public userDetailsUpdation(userRegisterModel : UserManagementForm): boolean{
return true;
}

}