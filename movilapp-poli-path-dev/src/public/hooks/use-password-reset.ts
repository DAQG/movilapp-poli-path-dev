import {useState} from 'react';
import {recoverPassword} from '../api/auth.service.ts';
import axios from 'axios';

type SendPasswordResetState = {
  isLoading: boolean;
  error: any | null;
};

export const useSendPasswordReset = (): [
  (email: string) => Promise<void>,
  SendPasswordResetState,
] => {
  const [state, setState] = useState<SendPasswordResetState>({
    isLoading: false,
    error: null,
  });

  const sendPasswordResetEmail = async (email: string): Promise<void> => {
    setState({isLoading: true, error: null});

    try {
      await recoverPassword(email);
      setState({isLoading: false, error: null});
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setState({isLoading: false, error: error?.response?.data.message});
        throw error;
      }
      setState({isLoading: false, error: error});
      throw error;
    }
  };

  return [sendPasswordResetEmail, {...state}];
};
