import {UpdateDataDto} from './dto/update-data.dto.ts';
import {environment} from '../../environments/environment.ts';
import axios from 'axios';
import {User} from '../interfaces/user.interface.ts';
import {
  OkResponse,
  OKResponseProfileImage,
} from '../../public/interfaces/ok.response.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Building} from '../interfaces/building.interface.ts';

const baseUrl = `${environment.API_URL}/${environment.API_VERSION}/users`;

export const updateData = async ({id, ...newData}: UpdateDataDto) => {
  const token = (await AsyncStorage.getItem('token'))?.trim();
  try {
    const {data} = await axios.patch(`${baseUrl}/${id}`, newData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data as User;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export const updateImageProfile = async (formData: FormData) => {
  const token = (await AsyncStorage.getItem('token'))?.trim();
  console.log(token);
  const {data} = await axios.post<OKResponseProfileImage>(
    `${environment.API_URL}/${environment.API_VERSION}/files/profile-image`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return data;
};

export const addFavoriteBuilding = async (buildingId: string) => {
  const token = (await AsyncStorage.getItem('token'))?.trim();
  const {data} = await axios.post<OkResponse>(
    `${baseUrl}/buildings/${buildingId}/favorite`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export const removeFavoriteBuilding = async (buildingId: string) => {
  const token = (await AsyncStorage.getItem('token'))?.trim();
  const {data} = await axios.delete<OkResponse>(
    `${baseUrl}/buildings/${buildingId}/favorite`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export const getFavoriteBuildings = async () => {
  const token = (await AsyncStorage.getItem('token'))?.trim();
  const {data} = await axios.get<Building[]>(`${baseUrl}/buildings/favorite`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
