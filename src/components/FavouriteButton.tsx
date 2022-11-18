import React from 'react'
import { IconButton } from '@mui/material'
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';

import { isInFavourites } from '../utils';

export const FavouriteButton =
  (props: {
    favouriteLaunchesArray: string[],
    id: string,
    removeFromFavourites: any,
    addToFavourites: any
  }) => {


  return (
    <>
      {
        isInFavourites(props.favouriteLaunchesArray, props.id as string) ?
          (
            <IconButton
              color="primary"
              className={"to-favourites-button"}
              onClick={props.removeFromFavourites}
              size={"medium"}
            >
              <StarRateRoundedIcon />
            </IconButton>
          ) : (
            <IconButton
              color="primary"
              className={"to-favourites-button"}
              onClick={props.addToFavourites}
              size={"medium"}
            >
              <StarBorderRoundedIcon />
            </IconButton>
          )
      }
    </>

  )
}
