import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Building} from '../../interfaces/building.interface.ts';
import {IonIcon} from '../utils/IonIcon.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {BuildingRootStackParamList} from '../../routes/StackBuildingNavigator.tsx';
import {environment} from '../../../environments/environment.ts';
import React, {useContext} from 'react';
import {BuildingListContext} from '../../context/BuildingListContext.tsx';
import {useTheme} from '../../../config/theme/globalStyles.ts';

interface Props {
  building: Building;
}

export const FavoriteBuildingItem = ({building}: Props) => {
  const globalColors = useTheme();
  const navigator = useNavigation<NavigationProp<BuildingRootStackParamList>>();
  const buildingListContext = useContext(BuildingListContext);
  const handleRemove = () => {
    buildingListContext?.removeBuildingFromFavorites(building);
  };
  const [errorImage, setErrorImage] = React.useState(false);

  return (
    <View style={[styles.container, {borderColor: globalColors.borderCard}]}>
      {building.imageUrls && building.imageUrls.length > 0 ? (
        <Image
          resizeMode="stretch"
          style={styles.image}
          source={{uri: `${environment.APP_HOST}/${building.imageUrls[0]}`}}
          onError={error => {
            console.log('Error cargando la imagen:', error);
            setErrorImage(true);
          }}
        />
      ) : (
        <Image
          resizeMode="stretch"
          style={styles.image}
          source={require('../../../assets/img/default-corporate-image.jpg')}
          onError={error => console.log('Error cargando la imagen:', error)}
        />
      )}
      {errorImage && (
        <Image
          resizeMode="stretch"
          style={styles.image}
          source={require('../../../assets/img/default-corporate-image.jpg')}
          onError={error => {
            console.log('Error cargando la imagen:', error);
          }}
        />
      )}
      <View style={styles.infoContainer}>
        <Text style={[styles.name, {color: globalColors.titleCard}]}>
          {building.name}
        </Text>
        <View style={styles.containerFlex}>
          <View
            style={[
              styles.noContainer,
              {backgroundColor: globalColors.success},
            ]}>
            <IonIcon
              name={'business-outline'}
              color={globalColors.white}
              size={15}
            />
            <Text style={styles.noText}>Edificio N° {building.no}</Text>
          </View>
          <Pressable
            style={({pressed}) => ({
              opacity: pressed ? 0.8 : 1,
            })}
            onPress={handleRemove}>
            <IonIcon
              name={'close-circle'}
              color={globalColors.secondary}
              size={30}
            />
          </Pressable>
        </View>
        <Text
          numberOfLines={5}
          ellipsizeMode="tail"
          style={[
            styles.description,
            {
              color: globalColors.textCard,
            },
          ]}>
          {building.description}
        </Text>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Pressable
            style={({pressed}) => ({
              ...styles.viewMoreContainer,
              backgroundColor: globalColors.primary,
              opacity: pressed ? 0.8 : 1,
            })}
            onPress={() => navigator.navigate('Building', building)}>
            <Text style={[styles.text, {color: 'white'}]}>Ver más</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 320,
    borderRadius: 5,
    borderWidth: 0.5,
    marginVertical: 10,
    marginBottom: 60,
  },
  infoContainer: {
    flex: 1,
    padding: 13,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  text: {
    fontSize: 18,
    color: 'white',
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

  noText: {
    color: 'white',
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
