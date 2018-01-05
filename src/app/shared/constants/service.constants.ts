import {HEROES} from '../../../mocks/heroes';
import {LOGIN} from '../../../mocks/login';
import {LOCATION1} from '../../../mocks/GetSensorsList-1001';
import {LOCATION2} from '../../../mocks/GetSensorsList-1002';
import {LOCATION3} from '../../../mocks/GetSensorsList-1003';
import {LOCATION4} from '../../../mocks/GetSensorsList-1004';
import {LOCATION5} from '../../../mocks/GetSensorsList-1005';
import {LOCATION6} from '../../../mocks/GetSensorsList-1006';
import {LOCATION7} from '../../../mocks/GetSensorsList-1007';
import {LOCATION8} from '../../../mocks/GetSensorsList-1008';
import {LOCATION9} from '../../../mocks/GetSensorsList-1009';
import {LOCATION10} from '../../../mocks/GetSensorsList-1010';
import {LOCATION11} from '../../../mocks/GetSensorsList-1011';
import {LOCATION12} from '../../../mocks/GetSensorsList-1012';
import {LOCATION13} from '../../../mocks/GetSensorsList-1013';
import {LOCATION14} from '../../../mocks/GetSensorsList-1014';
import {LOCATION15} from '../../../mocks/GetSensorsList-1015';
import {LOCATION16} from '../../../mocks/GetSensorsList-1016';

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
  },
  GET_LOCATION_FIVE:{
    'path':'/location/I005',
    'mock':LOCATION5,
    'live':'/location/I005'
  },
  GET_LOCATION_SIX:{
    'path':'/location/I006',
    'mock':LOCATION6,
    'live':'/location/I006'
  },
  GET_LOCATION_SEVEN:{
    'path':'/location/I007',
    'mock':LOCATION7,
    'live':'/location/I007'
  },
  GET_LOCATION_EIGHT:{
    'path':'/location/I008',
    'mock':LOCATION8,
    'live':'/location/I008'
  },
  GET_LOCATION_NINE:{
    'path':'/location/I009',
    'mock':LOCATION9,
    'live':'/location/I009'
  },
  GET_LOCATION_TEN:{
    'path':'/location/I010',
    'mock':LOCATION10,
    'live':'/location/I010'
  },
  GET_LOCATION_ELEVEN:{
    'path':'/location/I011',
    'mock':LOCATION11,
    'live':'/location/I011'
  },
  GET_LOCATION_TWELVE:{
    'path':'/location/I012',
    'mock':LOCATION12,
    'live':'/location/I012'
  },
  GET_LOCATION_THIRTEEN:{
    'path':'/location/I013',
    'mock':LOCATION13,
    'live':'/location/I013'
  },
  GET_LOCATION_FOURTEEN:{
    'path':'/location/I014',
    'mock':LOCATION14,
    'live':'/location/I014'
  },
  GET_LOCATION_FIFTEEN:{
    'path':'/location/I015',
    'mock':LOCATION15,
    'live':'/location/I015'
  },
  GET_LOCATION_SIXTEEN:{
    'path':'/location/I016',
    'mock':LOCATION16,
    'live':'/location/I016'
  },
};
