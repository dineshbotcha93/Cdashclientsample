export class NewUserRegistrationForm {


  private dashboardUserName: string;
  private dashboardPassword: string;
  private firstName: string;
  private lastName: string;
  private productName: string;
  private email: string;
  private smsNumber: string;
  private smsCarrierID: string;
  private account: AccountRegistrationForm;

  constructor( newUserRegistrationForm : any ) {
  this.dashboardUserName =  newUserRegistrationForm.dashboardUserName || '';
  this.dashboardPassword = newUserRegistrationForm.dashboardPassword;
  this.firstName = newUserRegistrationForm.firstName || '';
  this.lastName = newUserRegistrationForm.lastName || '';
  this.productName = newUserRegistrationForm.productName || '';
  this.email = newUserRegistrationForm.email || '';
  this.smsNumber = newUserRegistrationForm.smsNumber || '';
  this.smsCarrierID = newUserRegistrationForm.smsCarrierID || '';
  this.account = newUserRegistrationForm.account || {};
  }
}

export class AccountRegistrationForm {

  private companyName: string;
  private address: string;
  private city: string;
  private state: string;
  private postalCode: string;
  private country: string;
  private address2: string;
  private purchaseLocation: string;
  private industryType: string;
  private businessType: string;
  private timeZone: string;
  private subscriptionExpirationdate: string;

  constructor( accountRegistrationForm : any ) {

  this.companyName = accountRegistrationForm.companyName || '';
  this.address = accountRegistrationForm.address || '';
  this.city = accountRegistrationForm.city || '';
  this.state = accountRegistrationForm.state || '';
  this.postalCode = accountRegistrationForm.postalCode || '';
  this.country = accountRegistrationForm.country || '';
  this.address2 = accountRegistrationForm.address2 || '';
  this.purchaseLocation = accountRegistrationForm.purchaseLocation || '';
  this.industryType = accountRegistrationForm.industryType || '';
  this.businessType = accountRegistrationForm.businessType || '';
  this.timeZone = accountRegistrationForm.timeZone || '';
  this.subscriptionExpirationdate = accountRegistrationForm.subscriptionExpirationdate;
  }
}
