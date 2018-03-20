export module UserProfile {
export class User {
  userName: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  admin: Boolean;
  //userID: number;
}
export class Notification {
  email: string;
  directSMS: string;
  smsNumber: string;
  externalSMSProvider: string;
  recievesMaintenanceByEmail: Boolean;
  recievesMaintenanceByPhone: Boolean;
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
