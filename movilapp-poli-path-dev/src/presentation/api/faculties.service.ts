import {environment} from '../../environments/environment.ts';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Faculty} from '../interfaces/faculty.interface.ts';

const baseUrl = `${environment.API_URL}/${environment.API_VERSION}/faculties`;

export const getFacultyById = async (id: string) => {
  const token = (await AsyncStorage.getItem('token'))?.trim();
  const {data} = await axios.get(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data as Faculty;
};
