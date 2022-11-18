import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from '../constants';

export type favouritesState = {
  favouriteLaunchesArray: string[],
  total: number
}

export type favouritesAction = {
  type: string,
  payload: string
}

const getStateFromLocalStorage: favouritesState | null =
  localStorage.getItem("favouritesState") ?
  JSON.parse(localStorage.getItem("favouritesState") as string) : null;


export const initialState: favouritesState = getStateFromLocalStorage || {
  favouriteLaunchesArray: [],
  total: 0
}

const favouritesReducer = (state: favouritesState = initialState, action: favouritesAction): favouritesState =>  {
  const {type, payload} = action;
  let newState;
  switch(type) {
    case ADD_TO_FAVOURITES: {
      const favouriteLaunchesArray: string[] = state.favouriteLaunchesArray;
      if(favouriteLaunchesArray.find((favouriteLaunch) => favouriteLaunch === payload)) {
        return state;
      }
      favouriteLaunchesArray.push(payload);
      state.total += 1;
      newState = { ...state, favouriteLaunchesArray: [ ...state.favouriteLaunchesArray ] };
      break;
    }
    case REMOVE_FROM_FAVOURITES: {
      const favouriteLaunchesArray: string[] = state.favouriteLaunchesArray;
      if(!favouriteLaunchesArray.find((favouriteLaunch) => favouriteLaunch === payload)) {
        return state;
      }
      const newFavouriteLaunchesArray: string[] =
        favouriteLaunchesArray.filter((favouriteLaunch) => favouriteLaunch !== payload);
      state.total -= 1;
      newState = { ...state, favouriteLaunchesArray: newFavouriteLaunchesArray };
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("favouritesState", JSON.stringify(newState))
  return newState
}

export default favouritesReducer;