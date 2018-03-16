export module UserProfile {
  export class User {
    active: Boolean;
    admin: Boolean;
    userFullName: string;
    userID: number;
    userName: string;
    voiceNumber: string;
  }
  export class Notification {
    email: string;
    directSMS: Boolean;
    smsNumber: string;
    externalSMSProvider: string;
    recievesMaintenanceByEmail: Boolean;
    recievesMaintenanceByPhone: Boolean;
  }
}
