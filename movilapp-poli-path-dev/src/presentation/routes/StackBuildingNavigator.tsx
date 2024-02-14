import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {HomeScreen} from '../screens/HomeScreen.tsx';
import {BuildingTopTabsNavigator} from './BuildingTopTabsNavigator.tsx';
import {Building} from '../interfaces/building.interface.ts';

export type BuildingRootStackParamList = {
  Home: undefined;
  Building: Building;
};

const Stack = createStackNavigator<BuildingRootStackParamList>();

export const StackBuildNavigator = () => {
  const navigator = useNavigation();

  useEffect(() => {
    navigator.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
          backgroundColor: 'transparent',
        },
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Building" component={BuildingTopTabsNavigator} />
    </Stack.Navigator>
  );
};
