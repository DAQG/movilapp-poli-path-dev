import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {entityColors} from './InputSearch.tsx';
import {IonIcon} from './IonIcon.tsx';
import {EntityData} from '../../api/search.service.ts';
import {useTheme} from '../../../config/theme/globalStyles.ts';

interface Props {
  entity: EntityData;
  onGoTo?: (entity: EntityData) => void;
}

export const CardResultSearch = ({entity, onGoTo}: Props) => {
  const globalColors = useTheme();
  const handleGoTo = () => {
    if (onGoTo) {
      onGoTo(entity);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <Text
        style={[
          {
            backgroundColor: entityColors[entity.type] || 'defaultColor',
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8,
            color: globalColors.textLabelType,
          },
          styles.text,
        ]}>
        {entity.type}
      </Text>
      <View style={styles.containerFlex}>
        <View style={{flex: 15}}>
          <Text
            style={[
              {
                fontWeight: 'bold',
                fontSize: 18,
                marginBottom: 5,
              },
            ]}>
            {entity.name}
          </Text>
          <Text numberOfLines={2} style={styles.description}>
            {entity.description}
          </Text>
        </View>
        <Pressable
          style={({pressed}) => ({
            ...styles.arriveButton,
            backgroundColor: globalColors.primary,
            opacity: pressed ? 0.8 : 1,
          })}
          onPress={handleGoTo}>
          <IonIcon name={'locate'} color={globalColors.white} size={20} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  textContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
  },

  containerFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    gap: 15,
  },

  arriveButton: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 100,
    padding: 10,
  },

  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});
