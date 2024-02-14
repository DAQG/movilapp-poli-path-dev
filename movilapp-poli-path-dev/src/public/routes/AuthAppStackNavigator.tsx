import {createStackNavigator} from '@react-navigation/stack';
import {MainScreen} from '../screens/MainScreen.tsx';
import {LogInScreen} from '../screens/LogInScreen.tsx';
import {SignUpScreen} from '../screens/SignUpScreen.tsx';
import {RecoverPasswordScreen} from '../screens/RecoverPasswordScreen.tsx';
import {SentEmailScreen} from '../screens/SentEmailScreen.tsx';
import React from 'react';
import {GuestBottomTabNavigator} from '../../guest/routes/GuestBottomTabNavigator.tsx';

export type RootStackParamList = {
  Main: undefined;
  LogIn: undefined;
  SignUp: undefined;
  RecoverPassword: undefined;
  SentEmail: {
    email: string;
  };
  GuestBottomTabNavigator: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AuthAppStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Main"
        component={MainScreen}
      />
      <Stack.Screen name="LogIn" component={LogInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="RecoverPassword" component={RecoverPasswordScreen} />
      <Stack.Screen name="SentEmail" component={SentEmailScreen} />
      <Stack.Screen
        name="GuestBottomTabNavigator"
        component={GuestBottomTabNavigator}
      />
    </Stack.Navigator>
  );
};
