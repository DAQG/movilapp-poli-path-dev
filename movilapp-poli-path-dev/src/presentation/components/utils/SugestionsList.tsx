import {EntityData} from '../../api/search.service.ts';
import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {useTheme} from '../../../config/theme/globalStyles.ts';

export const SuggestionsList = ({
  suggestions,
  handleSelectSuggestion,
  entityColors,
}: {
  suggestions: EntityData[];
  handleSelectSuggestion: (suggestion: EntityData) => void;
  entityColors: {[key: string]: string};
}) => {
  const globalColors = useTheme();
  return (
    <>
      {suggestions.map(suggestion => (
        <Pressable
          key={suggestion.id}
          onPress={() => handleSelectSuggestion(suggestion)}
          style={({pressed}) => ({
            ...styles.result,
            backgroundColor: globalColors.background,
            opacity: pressed ? 0.8 : 1,
          })}>
          <Text
            numberOfLines={2}
            textBreakStrategy={'simple'}
            style={{
              maxWidth: '80%',
              color: globalColors.whiteOrBlack,
            }}>
            {suggestion.name}
          </Text>
          <Text
            style={{
              backgroundColor: entityColors[suggestion.type] || 'defaultColor',
              paddingHorizontal: 10,
              paddingVertical: 2,
              borderRadius: 5,
              color: globalColors.textLabelType,
            }}>
            {suggestion.type}
          </Text>
        </Pressable>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  result: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 20,
    fontSize: 16,
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },
});
