import {useState} from 'react';

type State = {
  isLoading: boolean;
  error: string | null;
};

type ReturnValue = [handleSendVerification: () => Promise<void>, state: State];

export const useSendVerification = (): ReturnValue => {
  const [state, setState] = useState<State>({
    isLoading: false,
    error: null,
  });

  const handleSendVerification = async () => {
    setState({isLoading: true, error: null});

    try {
      setState({isLoading: false, error: null});
    } catch (error) {
      setState({
        isLoading: false,
        error: error?.toString() || 'Unknown error occurred',
      });
    }
  };

  return [handleSendVerification, {...state}];
};
