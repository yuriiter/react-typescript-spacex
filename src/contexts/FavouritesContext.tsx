import React, {createContext, useReducer} from "react"
import favouritesReducer, { favouritesAction, favouritesState, initialState } from '../reducers/favouritesReducer';

export const FavouritesContext =
  createContext<{state: favouritesState, dispatch: React.Dispatch<favouritesAction> | null}>({
    state: initialState,
    dispatch: null
  });

export const FavouritesProvider: React.FC<{children: React.ReactNode}> = ({ children}) => {
  const [state, dispatch] = useReducer(favouritesReducer, initialState);

  return (
    <FavouritesContext.Provider
      value={{state: state, dispatch: dispatch}}
    >
      {children}
    </FavouritesContext.Provider>
  )
};