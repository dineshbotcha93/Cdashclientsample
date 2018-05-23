/*
IMPORTANT NOTICE: PLEASE leave the EXTERNAL_SERVER_URL blank. The app
automatically switches between which version to use (prod or dev) based on
environment.ts file and picks on of EXTERNAL_SERVER_URL_DEV or EXTERNAL_SERVER_URL_PROD
and assigns it to EXTERNAL_SERVER_URL
*/

export const SERVER_URLS = {
  GOOGLE_API_URL: 'https://maps.googleapis.com/maps/api/geocode/json?address=',
  EXTERNAL_SERVER_URL: '',
  EXTERNAL_SERVER_URL_DEV: 'http://71.174.254.42:9080',
  EXTERNAL_SERVER_URL_PROD: 'https://portalapi.digitalcoldchain.com'
  //EXTERNAL_SERVER_URL_DEV:'https://71.174.254.42:9081'
}
