import {HEROES} from '../../../mocks/heroes';
import {LOGIN} from '../../../mocks/login';

export const SERVICE_CONSTANTS = {
  GET_HEROES_LIST: {
    'path':'heroes',
    'mock':HEROES,
    'live':'/heroes',
  },
  GET_AUTH_USERS: {
    'path':'login',
    'mock':LOGIN,
    'live':'/login'
  }
};
