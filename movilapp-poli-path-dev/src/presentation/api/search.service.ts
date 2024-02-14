import {environment} from '../../environments/environment.ts';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SearchResponse {
  buildings: EntityData[];
  faculties: EntityData[];
  offices: EntityData[];
  laboratories: EntityData[];
  pointsOfInterest: EntityData[];
}

export interface EntityData {
  id: string;
  name: string;
  type: string;
  description: string;
  buildingId: string | null;
  location: {
    latitude: number;
    longitude: number;
  };
}

const baseUrl = `${environment.API_URL}/${environment.API_VERSION}`;

export const searchSuggestions = async (search: string) => {
  const token = (await AsyncStorage.getItem('token'))?.trim();
  const {data} = await axios.post<SearchResponse>(
    `${baseUrl}/search/suggestions`,
    {
      search: search,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};
