import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {IonIcon} from './IonIcon.tsx';
import React, {useState} from 'react';
import {
  searchSuggestions,
  SearchResponse,
  EntityData,
} from '../../api/search.service.ts';
import {SuggestionsList} from './SugestionsList.tsx';
import {useTheme} from '../../../config/theme/globalStyles.ts';

export const entityColors: {[key: string]: string} = {
  Edificio: '#ffeac3',
  Laboratorio: '#c3eaff',
  Facultad: '#d3ffdb',
  Oficina: '#c3edff',
  'Punto de inter\u00E9s': '#ffc3c3',
};

interface Props {
  onSuggestionSelected: (suggestion: EntityData | null) => void;
}

export const InputSearch = ({onSuggestionSelected}: Props) => {
  const globalColors = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResponse | null>(null);
  const [prevSearchValue, setPrevSearchValue] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (value: string) => {
    setIsSearching(true);
    setSearchValue(value);
    // Verifica si la nueva entrada es diferente y no es un prefijo de la entrada anterior
    if (value !== prevSearchValue && !prevSearchValue.startsWith(value)) {
      setPrevSearchValue(value);
      setSuggestions(null);

      if (value === '') {
        setSuggestions(null);
        console.log('Cadena vacía. Suggestions:', suggestions);
        return;
      }

      try {
        const suggestionsApi = await searchSuggestions(value);
        if (suggestionsApi) {
          setSuggestions(suggestionsApi);
          setPrevSearchValue('');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSelectSuggestion = (suggestion: EntityData) => {
    onSuggestionSelected(suggestion);
    setSuggestions(null);
    Keyboard.dismiss();
    setIsSearching(false);
    setSearchValue('');
  };

  return (
    <>
      <View
        style={[
          styles.containerSearch,
          {backgroundColor: globalColors.searchBackground},
        ]}>
        <IonIcon name={'search'} color={globalColors.mediumGray} />
        <TextInput
          onChangeText={handleSearch}
          value={searchValue}
          placeholder="Buscar"
          style={[styles.input, {color: globalColors.darkGray}]}
          onSubmitEditing={() => handleSearch(searchValue)}
          placeholderTextColor={globalColors.mediumGray}
        />
      </View>
      {isSearching && searchValue !== '' && (
        <View
          style={[
            styles.containerSuggestions,
            {backgroundColor: globalColors.resultsBackground},
          ]}>
          {suggestions && (
            <>
              {suggestions.buildings.length === 0 &&
              suggestions.laboratories.length === 0 &&
              suggestions.faculties.length === 0 &&
              suggestions.offices.length === 0 &&
              suggestions.pointsOfInterest.length === 0 ? (
                <Text
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                    marginBottom: 10,
                    color: globalColors.whiteOrBlack,
                  }}>
                  No se encontraron resultados...
                </Text>
              ) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={suggestionsToArray(suggestions)}
                  keyExtractor={item => {
                    return item.id;
                  }}
                  renderItem={({item}) => (
                    <SuggestionsList
                      suggestions={item.data}
                      handleSelectSuggestion={handleSelectSuggestion}
                      entityColors={entityColors}
                    />
                  )}
                  style={[
                    styles.containerSuggestions,
                    {backgroundColor: globalColors.resultsBackground},
                  ]}
                />
              )}
            </>
          )}
          {!suggestions && (
            <Text
              style={{
                paddingVertical: 5,
                paddingHorizontal: 15,
                marginBottom: 10,
                color: globalColors.whiteOrBlack,
              }}>
              Buscando resultados...
            </Text>
          )}
        </View>
      )}
    </>
  );
};

const suggestionsToArray = (
  suggestions: SearchResponse,
): {id: string; data: EntityData[]}[] => {
  return [
    {id: 'buildings', data: suggestions.buildings},
    {id: 'laboratories', data: suggestions.laboratories},
    {id: 'faculties', data: suggestions.faculties},
    {id: 'offices', data: suggestions.offices},
    {id: 'pointsOfInterest', data: suggestions.pointsOfInterest},
  ].filter(category => category.data.length > 0);
};

const styles = StyleSheet.create({
  containerSearch: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 10,
    gap: 10,
  },
  input: {
    flex: 1,
  },
  containerSuggestions: {
    borderRadius: 10,
    width: '100%',
    maxHeight: 300,
    paddingTop: 10,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
});
