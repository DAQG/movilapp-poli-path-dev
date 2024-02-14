import {useState} from 'react';
import {signUp} from '../api/auth.service.ts';
import {CreateUserDto} from '../api/dto/create-user.dto.ts';
import axios from 'axios';

type SignUpState = {
  isLoading: boolean;
  error: any;
};

export const useSignUp = (): [
  (values: CreateUserDto) => Promise<void>,
  SignUpState,
] => {
  const [state, setState] = useState<SignUpState>({
    isLoading: false,
    error: null,
  });

  const handleSignUp = async (createUserDto: CreateUserDto) => {
    try {
      setState({isLoading: true, error: null});
      await signUp(createUserDto);
      setState({isLoading: false, error: null});
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setState({isLoading: false, error: error?.response?.data.message});
        throw error;
      }
      setState({isLoading: false, error: error});
    }
  };

  return [handleSignUp, {...state}];
};
