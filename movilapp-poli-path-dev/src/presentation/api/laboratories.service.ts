import {environment} from '../../environments/environment.ts';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Laboratory} from '../interfaces/laboratory.interface.ts';

const baseUrl = `${environment.API_URL}/${environment.API_VERSION}/laboratories`;

export const getLaboratoryById = async (id: string) => {
  const token = (await AsyncStorage.getItem('token'))?.trim();
  const {data} = await axios.get(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data as Laboratory;
};
