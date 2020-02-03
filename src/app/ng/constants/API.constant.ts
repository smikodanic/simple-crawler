/**
 * List of API endpoints
 */
import { environment } from '../../../environments/environment';


// api base URL
const api_base_url = environment.api_base_url;


export const API = {
  BASE_URL: api_base_url,

  CRAWLER: {
    start: api_base_url + '/api/crawler/start',
    getData: api_base_url + '/api/crawler/getdata'
  }

};
