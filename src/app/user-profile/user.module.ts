export module UserProfile {
export class User {
  dashboardUserName: string;
  dashboardPassword: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  isAdmin: Boolean;
  //userID: number;
}
export class Notification {
  directSMS: number;
  smsNumber: string;
  smsCarrierID: number;
  recievesSensorNotificationByText: number;
  recievesMaintenanceByEmail: number;
  recievesMaintenanceByPhone: number;
  countryCode: string;
}

export class UpdateAccount {
  accountID: number;
  //address: string;
  //address2: string;
  //city: string;
  companyName: string;
  //country: string;
  //postalCode: string;
  resellerID: number;
  //state: string;
  timeZoneID: number;
  address: Object;
 }

export class Address {
  street: string;
  housenumber: string;
  city: string;
  country: string;
  zipcode: string;
  state: string;
 }

 export class RealEditAccount {
  accountID: number;
  address: string;
  address2: string;
  city: string;
  companyName: string;
  country: string;
  postalCode: string;
  resellerID: number;
  state: string;
  timeZone: number;
 }
}
