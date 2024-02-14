import {Faculty} from './faculty.interface.ts';
import {Laboratory} from './laboratory.interface.ts';
import {PointOfInterest} from './point-of-interest.interface.ts';
import {Office} from './office.interface.ts';

export interface Building {
  visits: number;
  id: string;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  no: number;
  type: string;
  imageNames?: string[];
  imageUrls?: string[];
  faculties?: Faculty[];
  laboratories?: Laboratory[];
  offices?: Office[];
  pointOfInterests?: PointOfInterest[];
  isFavorite?: boolean;
}

// export const BUILDINGS: Building[] = [
//   {
//     id: '1',
//     name: 'Facultad de sistemas',
//     address: 'Address 1',
//     description:
//       'La Facultad de sistemas es la mejor facultad de la universidad',
//     latitude: 0,
//     longitude: 0,
//     no: 2,
//   },
//   {
//     id: '2',
//     name: 'Facultad de sistemas',
//     address: 'Address 1',
//     description:
//       'La Facultad de sistemas es la mejor facultad de la universidad',
//     latitude: 0,
//     longitude: 0,
//     no: 1,
//   },
//   {
//     id: '3',
//     name: 'Facultad de sistemas',
//     address: 'Address 1',
//     description:
//       'La Facultad de sistemas es la mejor facultad de la universidad',
//     latitude: 0,
//     longitude: 0,
//     no: 3,
//   },
// ];
