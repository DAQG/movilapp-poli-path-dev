import React, {useCallback, useEffect, useState} from 'react';
import {Building} from '../interfaces/building.interface.ts';
import {getBuildings} from '../api/buildings.service.ts';
import axios from 'axios';
import {
  addFavoriteBuilding,
  getFavoriteBuildings,
  removeFavoriteBuilding,
} from '../api/user.service.ts';
import {useAuth} from '../../context/AuthContext.tsx';

interface BuildingListContextProps {
  buildingList: Building[];
  favoriteBuildings: Building[];
  refreshBuildingList: () => void;
  refreshFavoriteBuildings: () => void;
  refreshing: boolean;
  addBuildingToFavorites: (building: Building) => void;
  removeBuildingFromFavorites: (building: Building) => void;
  clearFavoriteBuildings: () => void;
  isBuildingInFavorites: (building: Building) => boolean;
}

export const BuildingListContext = React.createContext<
  BuildingListContextProps | undefined
>(undefined);

interface BuildingListProviderProps {
  children: React.ReactNode;
}

export const BuildingListProvider: React.FC<BuildingListProviderProps> = ({
  children,
}) => {
  const [buildingList, setBuildingList] = useState<Building[]>([]);
  const [favoriteBuildings, setFavoriteBuildings] = useState<Building[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const {user} = useAuth();

  const refreshBuildingList = useCallback(async () => {
    setRefreshing(true);
    try {
      const updatedBuildingList = await getBuildings();
      setBuildingList(updatedBuildingList);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      }
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const refreshFavoriteBuildings = useCallback(async () => {
    setRefreshing(true);
    try {
      const updatedFavoriteBuildings = await getFavoriteBuildings();
      setFavoriteBuildings(updatedFavoriteBuildings);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      }
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    refreshBuildingList().then(r => console.log('refreshBuildingList', r));
    refreshFavoriteBuildings().then(r =>
      console.log('refreshFavoriteBuildings', r),
    );
  }, [refreshBuildingList, refreshFavoriteBuildings, user]);

  const addBuildingToFavorites = useCallback(
    async (building: Building) => {
      if (building) {
        if (
          favoriteBuildings.find(favBuilding => favBuilding.id === building.id)
        ) {
          return;
        }

        try {
          setFavoriteBuildings(prevFavorites => {
            return [...prevFavorites, building];
          });
          await addFavoriteBuilding(building.id);
        } catch (error) {
          console.error('Error al agregar el edificio a favoritos:', error);
        }
      } else {
        console.log('El edificio no existe');
      }
    },
    [favoriteBuildings],
  );

  const removeBuildingFromFavorites = useCallback(
    async (building: Building) => {
      try {
        setFavoriteBuildings(prevFavorites =>
          prevFavorites.filter(favBuilding => favBuilding.id !== building.id),
        );
        await removeFavoriteBuilding(building.id);
      } catch (error) {
        console.error('Error al eliminar el edificio de favoritos:', error);
      }
    },
    [setFavoriteBuildings],
  );

  const clearFavoriteBuildings = useCallback(() => {
    setFavoriteBuildings([]);
  }, [setFavoriteBuildings]);

  const isBuildingInFavorites = useCallback(
    (building: Building) => {
      return !!favoriteBuildings.find(
        favBuilding => favBuilding.id === building.id,
      );
    },
    [favoriteBuildings],
  );

  const contextValue: BuildingListContextProps = {
    buildingList,
    favoriteBuildings,
    refreshBuildingList,
    refreshFavoriteBuildings,
    refreshing,
    addBuildingToFavorites,
    removeBuildingFromFavorites,
    clearFavoriteBuildings,
    isBuildingInFavorites,
  };

  return (
    <BuildingListContext.Provider value={contextValue}>
      {children}
    </BuildingListContext.Provider>
  );
};
