import {useState} from 'react';
import axios from 'axios';
import {User} from '../interfaces/user.interface.ts';
import {UpdateDataDto} from '../api/dto/update-data.dto.ts';
import {updateData} from '../api/user.service.ts';

type UpdateDataState = {
  isLoading: boolean;
  error: any | null;
};

export const useUpdateData = (): [
  (values: UpdateDataDto) => Promise<User | null>,
  UpdateDataState,
] => {
  const [state, setState] = useState<UpdateDataState>({
    isLoading: false,
    error: null,
  });

  const handleUpdateData = async (data: UpdateDataDto) => {
    setState({isLoading: true, error: null});

    try {
      const user = await updateData(data);
      setState({isLoading: false, error: null});
      return user;
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
