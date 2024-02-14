import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {HamburgerMenu} from '../components/utils/HamburgerMenu.tsx';
import {FacultyScreen} from '../screens/building/FacultyScreen.tsx';
import {LaboratoryScreen} from '../screens/building/LaboratoryScreen.tsx';
import {OfficeScreen} from '../screens/building/OfficeScreen.tsx';
import {PointOfInterestScreen} from '../screens/building/PointOfInterestScreen.tsx';
import {IonIcon} from '../components/utils/IonIcon.tsx';
import {BuildingDescription} from '../components/building/BuildingDescription.tsx';
import {RouteProp, useRoute} from '@react-navigation/native';
import {BuildingRootStackParamList} from './StackBuildingNavigator.tsx';
import {RefreshControl, ScrollView} from 'react-native';
import {Building} from '../interfaces/building.interface.ts';
import {BuildingContext} from '../context/BuildingContext.tsx';
import {BuildingListContext} from '../context/BuildingListContext.tsx';
import {getBuildingById} from '../api/buildings.service.ts';
import {useTheme} from '../../config/theme/globalStyles.ts';

const Tab = createMaterialTopTabNavigator();

export const BuildingTopTabsNavigator = () => {
  const globalColors = useTheme();
  const routeBuilding =
    useRoute<RouteProp<BuildingRootStackParamList, 'Building'>>().params;

  const [refreshing, setRefreshing] = useState(false);
  const [building, setBuilding] = useState<Building>(routeBuilding);
  const buildingListContext = useContext(BuildingListContext);

  useEffect(() => {
    setBuilding(routeBuilding);
  }, [routeBuilding]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const updatedBuilding: Building = await getBuildingById(routeBuilding.id);
      setBuilding(prevBuilding => ({...prevBuilding, ...updatedBuilding}));
      buildingListContext?.refreshBuildingList();
    } catch (error) {
      console.error('Error al refrescar los datos del edificio:', error);
    } finally {
      setRefreshing(false);
    }
  }, [buildingListContext, routeBuilding.id]);

  return (
    <>
      <HamburgerMenu />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: globalColors.background,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <BuildingDescription building={building} />
      </ScrollView>
      <BuildingContext.Provider value={building}>
        <Tab.Navigator
          style={{flex: 3}}
          screenOptions={{
            tabBarScrollEnabled: true,
            tabBarActiveTintColor: globalColors.tabBarActiveTintColor,
            tabBarStyle: {
              backgroundColor: globalColors.background,
              shadowColor: 'transparent',
              borderTopWidth: 0.1,
              elevation: 0,
            },
            tabBarLabelStyle: {
              marginBottom: 5,
              fontSize: 15,
              textTransform: 'capitalize',
            },
            tabBarIndicatorStyle: {
              backgroundColor: globalColors.primary,
            },
          }}>
          <Tab.Screen
            options={{
              title: 'Facultades',
              tabBarIcon: ({color}) => <IonIcon name="school" color={color} />,
            }}
            name="Faculty"
            component={FacultyScreen}
          />
          <Tab.Screen
            options={{
              title: 'Laboratorios',
              tabBarIcon: ({color}) => <IonIcon name="flask" color={color} />,
            }}
            name="Laboratory"
            component={LaboratoryScreen}
          />
          <Tab.Screen
            options={{
              title: 'Oficinas',
              tabBarIcon: ({color}) => (
                <IonIcon name="briefcase" color={color} />
              ),
            }}
            name="Office"
            component={OfficeScreen}
          />
          <Tab.Screen
            options={{
              title: 'Puntos de interés',
              tabBarIcon: ({color}) => <IonIcon name="map" color={color} />,
            }}
            name="Point"
            component={PointOfInterestScreen}
          />
        </Tab.Navigator>
      </BuildingContext.Provider>
    </>
  );
};
