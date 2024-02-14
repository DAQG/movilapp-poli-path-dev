import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {IonIcon} from '../components/utils/IonIcon.tsx';
import {SearchScreen} from '../screens/SearchScreen.tsx';
import {StackBuildNavigator} from './StackBuildingNavigator.tsx';
import {FavoritesScreen} from '../screens/FavoritesScreen.tsx';
import {useTheme} from '../../config/theme/globalStyles.ts';

const Tab = createBottomTabNavigator();

export const VerifiedBottomTabNavigator = () => {
  const globalColors = useTheme();
  return (
    <Tab.Navigator
      initialRouteName={'StackBuildNavigator'}
      screenOptions={{
        tabBarActiveTintColor: globalColors.tabBarActiveTintColor,
        tabBarLabelStyle: {
          marginBottom: 5,
        },
        tabBarStyle: {
          backgroundColor: globalColors.tabBottomBar,
          borderTopWidth: 0,
          paddingBottom: 5,
        },
        headerStyle: {elevation: 0, shadowColor: 'transparent'},
      }}>
      <Tab.Screen
        name="SearchScreen"
        options={{
          title: 'Buscar',
          headerShown: false,
          tabBarIcon: ({color}) => <IonIcon name="map" color={color} />,
        }}
        component={SearchScreen}
      />
      <Tab.Screen
        name="StackBuildNavigator"
        options={{
          title: 'Inicio',
          tabBarIcon: ({color}) => <IonIcon name="home" color={color} />,
        }}
        component={StackBuildNavigator}
      />
      <Tab.Screen
        name="FavoritesScreen"
        options={{
          title: 'Favoritos',
          headerShown: false,
          tabBarIcon: ({color}) => (
            <IonIcon name="heart-outline" color={color} />
          ),
        }}
        component={FavoritesScreen}
      />
    </Tab.Navigator>
  );
};
