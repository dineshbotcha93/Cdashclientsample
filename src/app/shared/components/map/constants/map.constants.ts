// Move to a global constants file.

export const MapConstants = {
  STATUS: {
    ALERTS: 'Alerts',
    MISSED_COMMUNICATION: 'MissedCommunication',
    LOW_SIGNAL: 'LowSignal',
    LOW_BATTERY: 'LowBattery',
    DEFAULTERS: 'Defaulters',
    NEW_CUSTOMERS: 'NewCustomers',
    DUE_CUSTOMERS: 'DueCustomers',
    RENEWED_CUSTOMERS: 'RenewedCustomers',
    OUTSTANDING_BALANCE: 'OutstandingBalance',
    RECENT_PAYMENTS: 'RecentPayments'
  },
  STATUS_NUMBERS:{
    GOOD:'0',
    LOW_SIGNAL:'1',
    LOW_BATTERY:'2',
    MISSED_COMMUNICATION:'3',
    ALERTS:'4'
  },
  SENSOR_TYPE:{
    HUMIDITY:'43',
    CONTACT:'9',
    TEMP:'2'
  },
  READABLE_STATUS:{
    GOOD:'Good',
    ALERTS:'Alerts',
    MISSED_COMMUNICATION:'Offline',
    LOW_SIGNAL:'Low Signal',
    LOW_BATTERY:'Low Battery'
  }
}
