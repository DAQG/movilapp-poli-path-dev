import {environment} from '../../environments/environment.ts';
import axios from 'axios';
import {Building} from '../../presentation/interfaces/building.interface.ts';

const baseUrl = `${environment.API_URL}/${environment.API_VERSION}/buildings/guests`;

export const getBuildings = async () => {
  const {data} = await axios.get(`${baseUrl}`);
  return data as Building[];
};

axios.interceptors.request.use(async request => {
  console.log('+++++++++++++++++++++++++++++++++++++++++++++++');
  console.log('Request:', request.method, request.url);
  console.log('Headers:', request.headers);
  console.log('+++++++++++++++++++++++++++++++++++++++++++++++');
  return request;
});

axios.interceptors.response.use(response => {
  console.log('***************************************');
  console.log('Response:', response.status);
  return response;
});
