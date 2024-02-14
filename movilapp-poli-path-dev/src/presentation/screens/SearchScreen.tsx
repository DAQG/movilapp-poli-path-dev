import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {globalStyles, useTheme} from '../../config/theme/globalStyles.ts';
import {InputSearch} from '../components/utils/InputSearch.tsx';
import {EntityData} from '../api/search.service.ts';
import {CardResultSearch} from '../components/utils/CardResultSearch.tsx';
import {IonIcon} from '../components/utils/IonIcon.tsx';
import {Location, Map} from '../components/map/Map.tsx';

export const SearchScreen = () => {
  const globalColors = useTheme();
  const [result, setResult] = useState<EntityData | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);

  const handleSuggestionSelected = async (suggestion: EntityData | null) => {
    if (suggestion) {
      console.log('Suggestion:', suggestion);
      setResult(suggestion);
    }
  };

  const goTo = (entity: EntityData) => {
    if (entity) {
      setDestination({
        latitude: entity.location.latitude,
        longitude: entity.location.longitude,
        name: entity.name,
        description: entity.description,
        id: entity.id,
      });
      setResult(null);
    }
  };

  return (
    <View
      style={[
        globalStyles.container,
        {
          marginBottom: 0,
          paddingBottom: 0,
        },
        {backgroundColor: globalColors.background},
      ]}>
      <Text style={[styles.title, {color: globalColors.primaryText}]}>
        Encuentra como llegar a tu destino
      </Text>
      <InputSearch onSuggestionSelected={handleSuggestionSelected} />
      <ScrollView style={{flex: 1}}>
        {result && (
          <>
            <Pressable
              style={({pressed}) => ({
                ...styles.closeButton,
                opacity: pressed ? 0.8 : 1,
              })}
              onPress={() => setResult(null)}>
              <IonIcon
                name={'close-circle'}
                color={globalColors.secondary}
                size={25}
              />
            </Pressable>
            <CardResultSearch entity={result} onGoTo={goTo} />
          </>
        )}
        <Map destination={destination} />
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

  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
});
