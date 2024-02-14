import {FlatList, StyleSheet, View} from 'react-native';
import {Building} from '../../interfaces/building.interface.ts';
import {BuildingItem} from './BuildingItem.tsx';
import React from 'react';
import {useAuth} from '../../../context/AuthContext.tsx';

interface Props {
  buildings: Building[];
}

export const Buildings = ({buildings}: Props) => {
  const {user} = useAuth();
  console.log('edificios:', buildings.length);

  // marcamos como favoritos los edificios que el usuario tiene en su lista de favoritos

  user?.favoriteBuildings.forEach(favoriteBuilding => {
    buildings.forEach(building => {
      if (favoriteBuilding.id === building.id) {
        console.log('marcando como favorito:', building.name);
        building.isFavorite = true;
      }
    });
  });

  return (
    <FlatList
      horizontal={true}
      data={buildings}
      renderItem={({item}) => <BuildingItem building={item} />}
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export const styles = StyleSheet.create({
  separator: {
    width: 20,
  },
});
