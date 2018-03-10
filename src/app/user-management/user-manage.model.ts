export class UserManagementForm {
  public email: string;
  public firstName: string;
  public lastName: string;
  public password: string;
  public confirmPassword: string;
  public isNewMaster: string;
  public notifEyeUsername: string;
	public notifEyePassword: string;

  constructor(userManagementForm: any) {
    this.isNewMaster = 'false';
    this.email = userManagementForm.email    || '';
    this.firstName = userManagementForm.firstName    || '';
    this.lastName = userManagementForm.lastName    || '';
    this.password = userManagementForm.password    || '';
    this.confirmPassword = userManagementForm.confirmPassword    || '';
    this.notifEyeUsername = userManagementForm.notifEyeUsername || '';
    this.notifEyePassword = userManagementForm.notifEyePassword || '';
  }
}
