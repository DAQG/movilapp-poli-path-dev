import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {DataSettingsScreen} from '../screens/profile/DataSettingsScreen.tsx';
import {PasswordSettingsScreen} from '../screens/profile/PasswordSettingsScreen.tsx';
import {ProfileSettingsScreen} from '../screens/profile/ProfileSettingsScreen.tsx';
import {ImageProfileSettingsScreen} from '../screens/profile/ImageProfileSettingsScreen.tsx';
import {Header} from '../components/utils/Header.tsx';
import {useTheme} from '../../config/theme/globalStyles.ts';
import {IonIcon} from '../components/utils/IonIcon.tsx';

export type RootStackProfileSettingsParamList = {
  Data: undefined;
  Password: undefined;
  ProfileSettings: undefined;
  ImageProfile: {
    image: {
      uri: string;
      type: string;
      fileName: string;
      fileSize: number;
      base64: string;
    };
  };
};

const Stack = createStackNavigator<RootStackProfileSettingsParamList>();

export const StackProfileSettingsNavigator = () => {
  const globalColors = useTheme();
  const navigator = useNavigation();

  useEffect(() => {
    navigator.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <Header onPress={() => navigator.dispatch(DrawerActions.toggleDrawer)} />
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerBackImage: () => (
            <IonIcon
              name="arrow-back-outline"
              color={globalColors.whiteOrBlack}
            />
          ),

          headerStyle: {
            elevation: 0,
            shadowColor: 'transparent',
            backgroundColor: globalColors.background,
          },
          headerTitleStyle: {
            color: globalColors.whiteOrBlack,
          },
          headerBackTitleStyle: {
            color: globalColors.whiteOrBlack,
          },
          headerTintColor: globalColors.whiteOrBlack,
        }}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ProfileSettings"
          component={ProfileSettingsScreen}
        />
        <Stack.Screen
          options={{
            title: 'Configuración de datos',
          }}
          name="Data"
          component={DataSettingsScreen}
        />
        <Stack.Screen
          options={{
            title: 'Configuración de contraseña',
          }}
          name="Password"
          component={PasswordSettingsScreen}
        />
        <Stack.Screen
          options={{
            title: 'Imagen de perfil',
          }}
          name="ImageProfile"
          component={ImageProfileSettingsScreen}
        />
      </Stack.Navigator>
    </>
  );
};
