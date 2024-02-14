import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GuestBuilding} from '../components/Building.tsx';
import {Building} from '../../presentation/interfaces/building.interface.ts';
import {getBuildings} from '../api/buildings.service.ts';
import {BackButton} from '../routes/GuestBottomTabNavigator.tsx';
import {globalStyles, useTheme} from '../../config/theme/globalStyles.ts';

export const GustHomeScreen = () => {
  const globalColors = useTheme();
  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    getBuildings()
      .then(buildingsApi => setBuildings(buildingsApi))
      .catch(error => console.log(error));
  }, []);

  const onRefresh = () => {
    getBuildings()
      .then(buildingsApi => setBuildings(buildingsApi))
      .catch(error => console.log(error));
  };

  return (
    <View style={globalStyles.container}>
      <BackButton />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }>
        <Text style={[styles.title, {color: globalColors.primaryText}]}>
          NAVEGA CON NOSOTROS
        </Text>
        <Text style={[styles.titleSecondary, {color: globalColors.darkGray}]}>
          ¿QUÉ HAY DE NUEVO?
        </Text>
        <Text style={[styles.text, {color: globalColors.darkGray}]}>
          Este es un mapa de toda la Escuela Politécnica Nacional
        </Text>
        <Image
          style={{marginBottom: 10}}
          source={require('../../assets/img/mapa.png')}
        />
        <Text style={styles.titleSecondary}>{'EXPLORAR TODO'}</Text>
        <Text style={styles.text}>
          Facultades, edificios, aulas, cafeterías, etc.
        </Text>
        <FlatList
          data={buildings}
          contentContainerStyle={{paddingBottom: 20}}
          renderItem={({item}) => <GuestBuilding building={item} />}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
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
  separator: {
    width: 5,
  },
});
