import {Building} from './building.interface.ts';

export interface User {
  name: string;
  lastname: string;
  id: string;
  email: string;
  isActive: boolean;
  roles: string[];
  isVerified: boolean;
  token: string;
  nameProfileImage?: string;
  imageUrl?: string;
  favoriteBuildings: Building[];
}
