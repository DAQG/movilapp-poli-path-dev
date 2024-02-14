import {useState} from 'react';
import {LoginUserDto} from '../api/dto/login-user.dto.ts';
import {login} from '../api/auth.service.ts';
import axios from 'axios';
import {User} from '../../presentation/interfaces/user.interface.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LogInState = {
  isLoading: boolean;
  error: any | null;
};

export const useLogIn = (): [
  (values: LoginUserDto) => Promise<User | null>,
  LogInState & {resetError: () => void},
] => {
  const [state, setState] = useState<LogInState>({
    isLoading: false,
    error: null,
  });

  const handleLogIn = async (credentials: LoginUserDto) => {
    setState({isLoading: true, error: null});

    try {
      const user = await login(credentials);
      await AsyncStorage.setItem('token', user.token);
      setState({isLoading: false, error: null});
      return user;
    } catch (error: any) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setState({isLoading: false, error: error?.response?.data.message});
        console.log(error?.response?.data.message);
        throw error;
      }
      setState({isLoading: false, error: error});
      console.log(error);
      throw error;
    }
  };

  const resetError = () => {
    setState(prevState => ({...prevState, error: null}));
  };

  return [handleLogIn, {...state, resetError}];
};
