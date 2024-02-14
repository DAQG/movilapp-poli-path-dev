import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Building} from '../../interfaces/building.interface.ts';
import {IonIcon} from '../utils/IonIcon.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {BuildingRootStackParamList} from '../../routes/StackBuildingNavigator.tsx';
import {environment} from '../../../environments/environment.ts';
import {BuildingListContext} from '../../context/BuildingListContext.tsx';
import {useTheme} from '../../../config/theme/globalStyles.ts';

interface Props {
  building: Building;
}

export const BuildingItem = ({building}: Props) => {
  const globalColors = useTheme();
  const [isLiked, setIsLiked] = useState(building.isFavorite);
  const buildingListContext = useContext(BuildingListContext);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsLiked(buildingListContext?.isBuildingInFavorites(building) || false);
  }, [buildingListContext, building]);

  const handeLike = () => {
    setIsLiked(prevIsLiked => !prevIsLiked);
    if (isLiked) {
      buildingListContext?.removeBuildingFromFavorites(building);
    } else {
      buildingListContext?.addBuildingToFavorites(building);
    }
  };

  const navigator = useNavigation<NavigationProp<BuildingRootStackParamList>>();
  return (
    <View
      style={[
        stylesBuilding.container,
        {
          borderColor: globalColors.borderCard,
          backgroundColor: globalColors.background,
        },
      ]}>
      {!imageError && building.imageUrls ? (
        <Image
          resizeMode="stretch"
          style={stylesBuilding.image}
          source={{uri: `${environment.APP_HOST}/${building.imageUrls[0]}`}}
          onError={error => {
            console.log(error);
            setImageError(true);
          }}
        />
      ) : (
        <Image
          resizeMode="stretch"
          style={stylesBuilding.image}
          source={require('../../../assets/img/default-corporate-image.jpg')}
        />
      )}

      <View style={stylesBuilding.infoContainer}>
        <Text
          style={[
            stylesBuilding.name,
            {
              color: globalColors.titleCard,
            },
          ]}>
          {building.name}
        </Text>
        <View style={stylesBuilding.containerFlex}>
          <View
            style={[
              stylesBuilding.noContainer,
              {backgroundColor: globalColors.success},
            ]}>
            <IonIcon
              name={'business-outline'}
              color={globalColors.white}
              size={15}
            />
            <Text style={{color: globalColors.white}}>
              Edificio N° {building.no}
            </Text>
          </View>
          <Pressable
            style={({pressed}) => ({
              opacity: pressed ? 0.8 : 1,
            })}
            onPress={handeLike}>
            <IonIcon
              name={isLiked ? 'heart' : 'heart-outline'}
              color={globalColors.yellow}
              size={30}
            />
          </Pressable>
        </View>
        <Text
          numberOfLines={5}
          ellipsizeMode="tail"
          style={[stylesBuilding.description, {color: globalColors.textCard}]}>
          {building.description}
        </Text>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Pressable
            style={({pressed}) => ({
              ...stylesBuilding.viewMoreContainer,
              backgroundColor: globalColors.primary,
              opacity: pressed ? 0.8 : 1,
            })}
            onPress={() => navigator.navigate('Building', building)}>
            <Text style={[stylesBuilding.text, {color: globalColors.white}]}>
              Ver más
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const stylesBuilding = StyleSheet.create({
  container: {
    width: 320,
    borderWidth: 0.5,
    borderRadius: 5,
    marginVertical: 10,
    marginBottom: 60,
    shadowColor: '#a9a9a9',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 8,
  },

  text: {
    fontSize: 18,
  },

  infoContainer: {
    flex: 1,
    padding: 13,
  },

  image: {
    width: 320,
    height: 200,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },

  name: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 5,
  },

  noContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 10,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },

  viewMoreContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 10,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },

  containerFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
