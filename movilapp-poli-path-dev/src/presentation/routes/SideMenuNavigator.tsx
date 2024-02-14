import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {globalStyles, useTheme} from '../../config/theme/globalStyles.ts';
import {IonIcon} from '../components/utils/IonIcon.tsx';
import {VerifiedBottomTabNavigator} from './VerifiedBottomTabNavigator.tsx';
import {useAuth} from '../../context/AuthContext.tsx';
import {StackProfileSettingsNavigator} from './StackProfileSettingsNavigator.tsx';

const Drawer = createDrawerNavigator();

export const SideMenuNavigator = () => {
  const globalColors = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        drawerType: 'slide',
        drawerPosition: 'right',
        drawerActiveBackgroundColor: globalColors.primary,
        drawerActiveTintColor: globalColors.white,
        drawerInactiveTintColor: globalColors.primaryText,
        drawerItemStyle: {
          borderRadius: 100,
          paddingHorizontal: 20,
        },
        drawerLabelStyle: {
          fontSize: 16,
          paddingLeft: 0,
          marginLeft: 0,
        },
        drawerStyle: {
          paddingVertical: 50,
          backgroundColor: globalColors.background,
        },
      }}>
      <Drawer.Screen
        options={{
          drawerIcon: ({color}) => <IonIcon name="home" color={color} />,
        }}
        name="Inicio"
        component={VerifiedBottomTabNavigator}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({color}) => <IonIcon name="build" color={color} />,
        }}
        name="Configuración"
        component={StackProfileSettingsNavigator}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const globalColors = useTheme();
  const {signOut} = useAuth();
  const {user} = useAuth();

  const handleLogout = async () => {
    try {
      signOut();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <DrawerContentScrollView style={{backgroundColor: globalColors.background}}>
      {user?.imageUrl ? (
        <Image source={{uri: user.imageUrl}} style={styles.profileImage} />
      ) : (
        <Image
          source={require('../../assets/img/default-photo.jpg')}
          style={styles.profileImage}
        />
      )}
      <Text
        style={[
          globalStyles.titleText,
          {
            color: globalColors.primaryText,
            fontSize: 20,
            textAlign: 'center',
            marginBottom: 20,
          },
        ]}>
        !Hola, {user && user.name}!
      </Text>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Cerrar sesión"
        onPress={handleLogout}
        labelStyle={{
          color: globalColors.white,
          fontSize: 16,
          paddingLeft: 0,
          marginLeft: 0,
        }}
        icon={() => (
          <IonIcon
            name="log-out-outline"
            size={28}
            color={globalColors.white}
          />
        )}
        style={{
          marginTop: 10,
          borderRadius: 100,
          paddingHorizontal: 20,
          backgroundColor: globalColors.primarySignOut,
        }}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
