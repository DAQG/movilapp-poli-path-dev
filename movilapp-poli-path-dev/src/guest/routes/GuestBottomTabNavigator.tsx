import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {IonIcon} from '../../presentation/components/utils/IonIcon.tsx';
import {GuestSearchScreen} from '../screens/GuestSearchScreen.tsx';
import {GustHomeScreen} from '../screens/GustHomeScreen.tsx';
import {Text, TouchableOpacity} from 'react-native';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from '../../public/routes/AuthAppStackNavigator.tsx';
import {useTheme} from '../../config/theme/globalStyles.ts';

const Tab = createBottomTabNavigator();

export const GuestBottomTabNavigator = () => {
  const globalColors = useTheme();
  return (
    <Tab.Navigator
      initialRouteName={'GuestHomeScreen'}
      sceneContainerStyle={{
        backgroundColor: globalColors.background,
      }}
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
        name="GuestSearchScreen"
        options={{
          title: 'Buscar',
          headerShown: false,
          tabBarIcon: ({color}) => <IonIcon name="search" color={color} />,
        }}
        component={GuestSearchScreen}
      />

      <Tab.Screen
        name="GuestHomeScreen"
        options={{
          title: 'Inicio',
          headerShown: false,
          tabBarIcon: ({color}) => <IonIcon name="home" color={color} />,
        }}
        component={GustHomeScreen}
      />
    </Tab.Navigator>
  );
};

export const BackButton = () => {
  const globalColors = useTheme();
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigator.dispatch(StackActions.popToTop);
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 10,
        marginBottom: 20,
      }}
      onPress={handlePress}>
      <IonIcon
        name={'log-out-outline'}
        size={25}
        color={globalColors.darkGray}
      />
      <Text style={{fontSize: 12, color: globalColors.darkGray}}>
        Salir del modo invitado
      </Text>
    </TouchableOpacity>
  );
};
