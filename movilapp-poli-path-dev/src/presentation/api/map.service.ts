import axios, {AxiosResponse} from 'axios';
import {Location} from '../components/map/Map.tsx';

export interface DistanceResult {
  distance: string;
  duration: string;
}

export async function getDistance(
  origin: Location,
  destination: Location,
): Promise<DistanceResult> {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.latitude},${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&mode=walking&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  const response: AxiosResponse = await axios.get(url);

  if (response.data.status !== 'OK') {
    throw new Error(
      'Error al obtener la distancia: ' + response.data.error_message,
    );
  }

  const element = response.data.rows[0].elements[0];

  return {
    distance: element.distance.text,
    duration: element.duration.text,
  };
}

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
