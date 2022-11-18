import React, { useContext } from 'react'
import { Box, Card, Typography } from '@mui/material'
import { Link } from "react-router-dom"

import * as gqlTypes from '../types'
import { FavouritesContext } from '../contexts/FavouritesContext';
import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from '../constants';
import { FavouriteButton } from './FavouriteButton';

export const LaunchesCard = (props: { launch: gqlTypes.Launch }) => {
  const context = useContext(FavouritesContext);

  const addToFavourites = (): void => {
    if(context.dispatch !== null) {
      context.dispatch({type: ADD_TO_FAVOURITES, payload: props.launch.id as string})
    }
  }
  const removeFromFavourites = (): void => {
    if(context.dispatch !== null) {
      context.dispatch({type: REMOVE_FROM_FAVOURITES, payload: props.launch.id as string})
    }
  }

  return (
    <Card
      className={"launch-card"}
    >
      {
        props.launch.links?.flickr_images && props.launch.links?.flickr_images.length > 0 && props.launch.mission_name ? (
            <div className={"launch-card__img-container"}>
              <Link to={`/launches/${props.launch.id}`}>
              <img className={"launch-card__img"} src={props.launch.links?.flickr_images[0] as string} alt={props.launch.mission_name} />
              </Link>
            </div>
        ) : null
      }
      <div className={"launch-card__container"}>
        <div className="d-flex justify-between">
          <Link to={`/launches/${props.launch.id}`}>
            <Typography
              variant={"h6"}
              fontWeight={"bold"}
              color={"primary.main"}
              className={"launch-card__name"}
            >
              {"Mission name: " + props.launch.mission_name}
            </Typography>
          </Link>
          <FavouriteButton
            favouriteLaunchesArray={context.state.favouriteLaunchesArray}
            id={props.launch.id as string}
            removeFromFavourites={removeFromFavourites}
            addToFavourites={addToFavourites}
          />
        </div>

        <Typography
          variant={"body1"}
          className={"launch-card__description"}
        >
          <Box
            component="span"
            sx={{ whiteSpace: 'normal' }}
            color={"primary.main"}
          >
            {"Launch ID: "}
          </Box>
          {props.launch.id || "no ID information"}
        </Typography>

        <Typography
          variant={"body1"}
          className={"launch-card__description"}
        >
          <Box
            component="span"
            sx={{ whiteSpace: 'normal' }}
            color={"primary.main"}
          >
            {"Details of the mission: "}
          </Box>
          {props.launch.details || "no details"}
        </Typography>

        <Typography
          variant={"body1"}
        >
          <Box
            component="span"
            sx={{ whiteSpace: 'normal' }}
            color={"primary.main"}
          >
            {"UTC launch date: "}
          </Box>
          {
            props.launch.launch_date_utc ?
            new Date(Date.parse(props.launch.launch_date_utc)).toLocaleString() :
              "no date found"
          }
        </Typography>

        <Typography
          variant={"body1"}
        >
          {
            props.launch.launch_site && props.launch.links && props.launch.links.article_link ? (
              <a href={ props.launch.links.article_link } target={"_blank"}>Open article</a>
            ) : null
          }
        </Typography>
      </div>
    </Card>
  )
}
