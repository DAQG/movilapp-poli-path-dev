import 'react-native-gesture-handler';
import {AuthAppStackNavigator} from './public/routes/AuthAppStackNavigator.tsx';
import {SideMenuNavigator} from './presentation/routes/SideMenuNavigator.tsx';
import {useAuth} from './context/AuthContext.tsx';
import {LoadingMainScreen} from './public/screens/LoadingMainScreen.tsx';
import React from 'react';

export const App = () => {
  const {user, authStatus, isLoadingData} = useAuth();

  if (authStatus === 'not-authenticated') {
    return <AuthAppStackNavigator />;
  }

  if (authStatus === 'checking') {
    return <LoadingMainScreen />;
  }

  if (authStatus === 'sing-out') {
    return <AuthAppStackNavigator />;
  }

  if (user && isLoadingData) {
    console.log('CARGANDO DATOS DE USUARIO');
    return <LoadingMainScreen />;
  }

  if (user && !isLoadingData) {
    console.log('DATOS DE USUARIO CARGADOS');
    return <SideMenuNavigator />;
  }

  return <AuthAppStackNavigator />;
};
