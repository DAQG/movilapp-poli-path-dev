import React, {
  createContext,
  useContext,
  ReactNode,
  FC,
  useState,
  useEffect,
} from 'react';
import {User} from '../presentation/interfaces/user.interface.ts';
import {useLogIn} from '../public/hooks/use-log-in.ts';
import {LoginUserDto} from '../public/api/dto/login-user.dto.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkAuthStatus} from '../public/api/auth.service.ts';
import {BuildingListContext} from '../presentation/context/BuildingListContext.tsx';

interface AuthContextProps {
  user: User | null;
  setUserData: (user: User) => void;
  signIn: (credentials: LoginUserDto) => Promise<void>;
  signOut: () => void;
  isLoadingData: boolean;
  signInState: {
    error: any | null;
    isLoading: boolean;
    resetError: () => void;
  };
  authStatus: 'checking' | 'authenticated' | 'not-authenticated' | 'sing-out';
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [logIn, {isLoading, error, resetError}] = useLogIn();
  const [authStatus, setAuthStatus] = useState<
    'checking' | 'authenticated' | 'not-authenticated' | 'sing-out'
  >('checking');
  const buildingListContext = useContext(BuildingListContext);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

  useEffect(() => {
    const loadTokenFromStorage = async () => {
      setAuthStatus('checking');
      try {
        const storedToken = await AsyncStorage.getItem('token');

        if (!storedToken) {
          console.log('No se encontró un token en AsyncStorage');
          setAuthStatus('not-authenticated');
          return;
        }

        const authenticatedUser: User | null = await checkAuthStatus(
          storedToken,
        );

        if (!authenticatedUser) {
          console.log('El token almacenado en AsyncStorage no es válido');
          setAuthStatus('not-authenticated');
          await AsyncStorage.removeItem('token');
          return;
        }

        try {
          await AsyncStorage.setItem('token', authenticatedUser.token);
          setIsLoadingData(true);
          buildingListContext?.refreshBuildingList();
          buildingListContext?.refreshFavoriteBuildings();
          setAuthStatus('authenticated');
          setUser(authenticatedUser);
        } catch (err) {
          console.log('ERROR:', err);
        } finally {
          setTimeout(() => {
            setIsLoadingData(false);
          }, 2000);
        }
      } catch (caughtError) {
        console.log('Error al cargar el token desde AsyncStorage', caughtError);
        setAuthStatus('not-authenticated');
      }
    };

    loadTokenFromStorage().then();
  }, []);

  const signIn = async (credentials: LoginUserDto) => {
    try {
      const authenticatedUser: User | null = await logIn(credentials);
      console.log('authenticatedUser', authenticatedUser);
      if (authenticatedUser) {
        try {
          await AsyncStorage.setItem('token', authenticatedUser.token);
          setIsLoadingData(true);
          buildingListContext?.refreshBuildingList();
          buildingListContext?.refreshFavoriteBuildings();
          setUser(authenticatedUser);
          setAuthStatus('authenticated');
        } catch (err) {
        } finally {
          setTimeout(() => {
            setIsLoadingData(false);
          }, 2000);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      setAuthStatus('sing-out');
      await AsyncStorage.removeItem('token');
    } catch (reason) {
      console.log('Error al cerrar sesión:', reason);
    }
  };

  const setUserData = async (updatedUser: User) => {
    setUser(updatedUser);
  };

  const contextValue: AuthContextProps = {
    user,
    setUserData,
    signOut,
    signIn,
    authStatus,
    isLoadingData,
    signInState: {
      error,
      isLoading,
      resetError,
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }

  return context;
};
