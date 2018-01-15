export class UserManagementForm {
  public email: string;
  public firstName: string;
  public lastName: string;
  public password: string;
  public confirmPassword: string;

  constructor(userManagementForm: any) {
    this.email = userManagementForm.email    || '';
    this.firstName = userManagementForm.firstName    || '';
    this.lastName = userManagementForm.lastName    || '';
    this.password = userManagementForm.password    || '';
    this.confirmPassword = userManagementForm.confirmPassword    || '';
  }
}