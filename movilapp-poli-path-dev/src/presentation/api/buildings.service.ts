import {environment} from '../../environments/environment.ts';
import axios from 'axios';
import {Building} from '../interfaces/building.interface.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = `${environment.API_URL}/${environment.API_VERSION}/buildings`;

export const getBuildings = async () => {
  const token = (await AsyncStorage.getItem('token'))?.trim();
  const {data} = await axios.get(`${baseUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data as Building[];
};

export const getBuildingById = async (id: string) => {
  const token = (await AsyncStorage.getItem('token'))?.trim();
  const {data} = await axios.get(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data as Building;
};

export const addVisit = async (id: string) => {
  const token = (await AsyncStorage.getItem('token'))?.trim();
  const {data} = await axios.patch(
    `${baseUrl}/${id}/visits`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
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
