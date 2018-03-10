export module UserProfile {
export class User {
  active: Boolean;
  admin: Boolean;
  email: string;
  userFullName: string;
  userID: number;
  userName: string;
  voiceNumber: string;
}
export class Notification {
  emailAddress: string;
  directSMS: Boolean;
  smsNumber: string;
  externalSMSProvider: string;
  recievesMaintenanceByEmail: Boolean;
  recievesMaintenanceByPhone: Boolean;
}
}