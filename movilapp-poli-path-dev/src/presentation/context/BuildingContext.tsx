import React from 'react';
import {Building} from '../interfaces/building.interface.ts';

export const BuildingContext = React.createContext<Building | undefined>(
  undefined,
);
