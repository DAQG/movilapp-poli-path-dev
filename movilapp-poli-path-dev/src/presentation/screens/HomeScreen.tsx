import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {globalStyles, useTheme} from '../../config/theme/globalStyles.ts';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {Buildings} from '../components/building/Buildings.tsx';
import {BuildingListContext} from '../context/BuildingListContext.tsx';
import {Header} from '../components/utils/Header.tsx';

export const HomeScreen = () => {
  const colors = useTheme();
  const navigator = useNavigation();
  const buildingListContext = useContext(BuildingListContext);

  useEffect(() => {
    navigator.setOptions({
      header: () => (
        <Header
          onPress={() => navigator.dispatch(DrawerActions.toggleDrawer)}
        />
      ),
    });
  }, []);

  return (
    <View
      style={[globalStyles.container, {backgroundColor: colors.background}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={buildingListContext?.refreshing || false}
            onRefresh={buildingListContext?.refreshBuildingList}
          />
        }>
        <Text style={[styles.title, {color: colors.primaryText}]}>
          NAVEGA CON NOSOTROS
        </Text>
        <Text style={[styles.titleSecondary, {color: colors.darkGray}]}>
          ¿QUÉ HAY DE NUEVO?
        </Text>
        <Text style={[styles.text, {color: colors.darkGray}]}>
          Este es un mapa de toda la Escuela Politécnica Nacional
        </Text>
        <Image
          style={{marginBottom: 10}}
          source={require('../../assets/img/mapa.png')}
        />
        <Text style={[styles.titleSecondary, {color: colors.darkGray}]}>
          {'EXPLORAR TODO'}
        </Text>
        <Text style={[styles.text, {color: colors.darkGray}]}>
          Facultades, edificios, aulas, cafeterías, etc.
        </Text>
        <Buildings buildings={buildingListContext?.buildingList || []} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    marginBottom: 20,
  },

  titleSecondary: {
    fontSize: 18,
    fontWeight: '900',
    marginVertical: 5,
  },

  text: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
  },
});
