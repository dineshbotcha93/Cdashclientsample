export class UserManagementForm {
  public email:           string;

  constructor(userManagementForm: any) {
    this.email = userManagementForm.email    || '';
  }
}