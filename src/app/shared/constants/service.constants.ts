import {HEROES} from '../../../mocks/heroes';
import {LOGIN} from '../../../mocks/login';
import {LOCATION1} from '../../../mocks/GetSensorsList-1001';
import {LOCATION2} from '../../../mocks/GetSensorsList-1002';
import {LOCATION3} from '../../../mocks/GetSensorsList-1003';
import {LOCATION4} from '../../../mocks/GetSensorsList-1004';

export const SERVICE_CONSTANTS = {
  GET_HEROES_LIST: {
    'path':'/heroes',
    'mock':HEROES,
    'live':'/heroes',
  },
  GET_AUTH_USERS: {
    'path':'/login',
    'mock':LOGIN,
    'live':'/login'
  },
  GET_LOCATION_ONE:{
    'path':'/location/I001',
    'mock':LOCATION1,
    'live':'/location/I001'
  },
  GET_LOCATION_TWO:{
    'path':'/location/I002',
    'mock':LOCATION2,
    'live':'/location/I002'
  },
  GET_LOCATION_THREE:{
    'path':'/location/I003',
    'mock':LOCATION3,
    'live':'/location/I003'
  },
  GET_LOCATION_FOUR:{
    'path':'/location/I004',
    'mock':LOCATION4,
    'live':'/location/I004'
  }
};
