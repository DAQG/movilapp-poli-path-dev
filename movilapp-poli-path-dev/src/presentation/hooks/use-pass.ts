import {useState} from 'react';
import axios from 'axios';
import {UpdatePassDto} from '../api/dto/update-pass.dto.ts';
import {updatePassword} from '../../public/api/auth.service.ts';

type UpdateDataState = {
  isLoading: boolean;
  error: any | null;
};

export const useUpdatePass = (): [
  (values: UpdatePassDto) => Promise<string | null>,
  UpdateDataState,
] => {
  const [state, setState] = useState<UpdateDataState>({
    isLoading: false,
    error: null,
  });

  const handleUpdateData = async (data: UpdatePassDto) => {
    setState({isLoading: true, error: null});

    try {
      const {message} = await updatePassword(data);
      setState({isLoading: false, error: null});
      return message;
    } catch (error: any) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setState({isLoading: false, error: error?.response?.data.message});
        return null;
      }
      setState({isLoading: false, error: error});
      return null;
    }
  };

  return [handleUpdateData, state];
};
