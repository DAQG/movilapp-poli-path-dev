import {FlatList, ScrollView, Text, View} from 'react-native';
import {globalStyles, useTheme} from '../../config/theme/globalStyles.ts';
import React, {useContext, useEffect} from 'react';
import {Header} from '../components/utils/Header.tsx';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {styles} from '../components/building/Buildings.tsx';
import {BuildingListContext} from '../context/BuildingListContext.tsx';
import {FavoriteBuildingItem} from '../components/building/FavoriteBuildingItem.tsx';

export const FavoritesScreen = () => {
  const colors = useTheme();
  const navigator = useNavigation();
  const buildingListContext = useContext(BuildingListContext);

  useEffect(() => {
    buildingListContext?.refreshFavoriteBuildings();
  }, []);

  return (
    <>
      <Header onPress={() => navigator.dispatch(DrawerActions.toggleDrawer)} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[globalStyles.container, {backgroundColor: colors.background}]}>
        <Text
          style={[
            globalStyles.titleSecondary,
            {marginBottom: 10, color: colors.whiteOrBlack},
          ]}>
          TU LISTA DE FAVORITOS
        </Text>
        <Text style={[globalStyles.text, {color: colors.whiteOrBlack}]}>
          Aquí puedes encontrar tus lugares favoritos
        </Text>
        <Text
          style={[
            globalStyles.text,
            {fontWeight: '500', marginTop: 10, color: colors.whiteOrBlack},
          ]}>
          EDIFICIOS FAVORITOS
        </Text>
        <FlatList
          horizontal={true}
          data={buildingListContext?.favoriteBuildings || []}
          renderItem={({item}) => <FavoriteBuildingItem building={item} />}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </ScrollView>
    </>
  );
};
