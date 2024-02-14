import {environment} from '../../environments/environment.ts';
import axios from 'axios';
import {CreateUserDto} from './dto/create-user.dto.ts';
import {LoginUserDto} from './dto/login-user.dto.ts';
import {User} from '../../presentation/interfaces/user.interface.ts';
import {LoginUserResponse} from '../interfaces/login-user.response.ts';
import {UpdatePassDto} from '../../presentation/api/dto/update-pass.dto.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {OkResponse} from '../interfaces/ok.response.ts';

const baseUrl = `${environment.API_URL}/${environment.API_VERSION}/auth`;

export const signUp = async (createUserDto: CreateUserDto) => {
  return await axios.post(`${baseUrl}/register`, createUserDto);
};

export const login = async (loginUserDto: LoginUserDto): Promise<User> => {
  const {data} = await axios.post<LoginUserResponse>(
    `${baseUrl}/login`,
    loginUserDto,
  );
  return data as User;
};

export const checkAuthStatus = async (token: string): Promise<User | null> => {
  try {
    const {data} = await axios.get(`${baseUrl}/check-auth-status`, {
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

export const recoverPassword = async (email: string) => {
  return await axios.get(`${baseUrl}/recover-password/${email}`);
};

export const updatePassword = async (updatePassDto: UpdatePassDto) => {
  const {data} = await axios.patch<OkResponse>(
    `${baseUrl}/change-password`,
    updatePassDto,
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      },
    },
  );
  return data;
};
