import {FlatList, View} from 'react-native';
import {globalStyles, useTheme} from '../../../config/theme/globalStyles.ts';
import React, {useContext} from 'react';
import {Card} from '../../components/utils/Card.tsx';
import {BuildingContext} from '../../context/BuildingContext.tsx';

export const PointOfInterestScreen = () => {
  const globalColors = useTheme();
  const building = useContext(BuildingContext);
  const pointOfInterests = building?.pointOfInterests;
  return (
    <View
      style={[
        globalStyles.container,
        {backgroundColor: globalColors.background},
      ]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={pointOfInterests}
        renderItem={({item}) => <Card entity={item} />}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
      />
    </View>
  );
};
