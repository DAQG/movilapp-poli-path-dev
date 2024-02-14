import {FlatList, View} from 'react-native';
import {globalStyles, useTheme} from '../../../config/theme/globalStyles.ts';
import React, {useContext} from 'react';
import {BuildingContext} from '../../context/BuildingContext.tsx';
import {Card} from '../../components/utils/Card.tsx';

export const LaboratoryScreen = () => {
  const globalColors = useTheme();
  const building = useContext(BuildingContext);
  const laboratories = building?.laboratories;
  return (
    <View
      style={[
        globalStyles.container,
        {backgroundColor: globalColors.background},
      ]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={laboratories}
        renderItem={({item}) => <Card entity={item} />}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
      />
    </View>
  );
};
