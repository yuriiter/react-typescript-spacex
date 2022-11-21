import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  Typography,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { useParams } from 'react-router';
import { useQuery } from 'urql';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { FavouritesContext } from '../contexts/FavouritesContext';
import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from '../constants';
import { FavouriteButton } from '../components/FavouriteButton';

const launchQuery = (id: string | undefined) => `
{
  launch(id: "${id}") {
    id
    details
    links {
      article_link
      flickr_images
      video_link
    }
    launch_date_utc
    mission_id
    mission_name
  }
}
`;

export const Launch = () => {
  const context = useContext(FavouritesContext);
  const { id } = useParams<string>();
  const [imageIdx, setImageIdx] = useState<number>(0);
  const [{ fetching, data, error }] = useQuery({
    query: launchQuery(id),
    pause: !id,
  });

  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, [id]);

  const addToFavourites = (e: any): void => {
    if (context.dispatch !== null) {
      context.dispatch({
        type: ADD_TO_FAVOURITES,
        payload: data.launch.id as string,
      });
    }
  };
  const removeFromFavourites = (e: any): void => {
    if (context.dispatch !== null) {
      context.dispatch({
        type: REMOVE_FROM_FAVOURITES,
        payload: data.launch.id as string,
      });
    }
  };

  const incrementImgIdx = () => {
    if (imageIdx === data.launch.links.flickr_images.length - 1) {
      setImageIdx(0);
    } else {
      setImageIdx((prevImageIdx) => prevImageIdx + 1);
    }
  };
  const decrementImgIdx = () => {
    if (imageIdx === 0) {
      setImageIdx(data.launch.links.flickr_images.length - 1);
    } else {
      setImageIdx((prevImageIdx) => prevImageIdx - 1);
    }
  };

  if (fetching) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else if (error) {
    return <>{`Oh no! Error: ${error}`}</>;
  }

  return (
    <div className={'container'}>
      <Card className="launch">
        <div className="row">
          <div className="launch-card launch-card--big">
            {data.launch.links?.flickr_images &&
            data.launch.links?.flickr_images.length > 0 &&
            data.launch.mission_name ? (
              <div className={'launch-card__img-container'}>
                <img
                  className={'launch-card__img'}
                  src={data.launch.links?.flickr_images[imageIdx] as string}
                  alt={data.launch.mission_name}
                />
                <div className={'buttons-bar'}>
                  <Link to={'/'}>
                    <Button
                      variant="contained"
                      color={'primary'}
                      size={'small'}
                      className={'back-button'}
                    >
                      Back
                    </Button>
                  </Link>
                  <div
                    style={
                      data.launch.links?.flickr_images &&
                      data.launch.links?.flickr_images.length > 1
                        ? {}
                        : { display: 'none' }
                    }
                    className={
                      'd-flex justify-center launch-card__img-slider-buttons'
                    }
                  >
                    <Button
                      variant={'contained'}
                      color={'secondary'}
                      size={'small'}
                      onClick={decrementImgIdx}
                    >
                      <ArrowBackIosIcon className={'arrow-left'} />
                    </Button>
                    <Button
                      color={'secondary'}
                      variant={'contained'}
                      size={'small'}
                      onClick={incrementImgIdx}
                    >
                      <ArrowForwardIosIcon />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="buttons-bar buttons-bar--relative">
                <Link to={'/'}>
                  <Button
                    variant="contained"
                    color={'primary'}
                    size={'small'}
                    className={'back-button'}
                  >
                    Back
                  </Button>
                </Link>
              </div>
            )}
            <div className={'launch-card__container'}>
              <div className="d-flex space-between">
                <Typography
                  variant={'h6'}
                  fontWeight={'bold'}
                  color={'primary.main'}
                  className={'launch-card__name'}
                >
                  {'Mission name: ' + data.launch.mission_name}
                </Typography>
                <FavouriteButton
                  favouriteLaunchesArray={context.state.favouriteLaunchesArray}
                  id={data.launch.id as string}
                  removeFromFavourites={removeFromFavourites}
                  addToFavourites={addToFavourites}
                />
              </div>

              <Typography
                variant={'body1'}
                className={'launch-card__description'}
              >
                <Box
                  component="span"
                  sx={{ whiteSpace: 'normal' }}
                  color={'primary.main'}
                >
                  {'Launch ID: '}
                </Box>
                {data.launch.id || 'no ID information'}
              </Typography>

              <Typography
                variant={'body1'}
                className={'launch-card__description'}
              >
                <Box
                  component="span"
                  sx={{ whiteSpace: 'normal' }}
                  color={'primary.main'}
                >
                  {'Details of the mission: '}
                </Box>
                {data.launch.details || 'no details'}
              </Typography>

              <Typography variant={'body1'}>
                <Box
                  component="span"
                  sx={{ whiteSpace: 'normal' }}
                  color={'primary.main'}
                >
                  {'UTC launch date: '}
                </Box>
                {data.launch.launch_date_utc
                  ? new Date(
                      Date.parse(data.launch.launch_date_utc)
                    ).toLocaleString()
                  : 'no date found'}
              </Typography>

              <Typography variant={'body1'}>
                {data.launch.launch_site &&
                data.launch.links &&
                data.launch.links.article_link ? (
                  <Link to={data.launch.links.article_link}>Launch site</Link>
                ) : null}
              </Typography>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
