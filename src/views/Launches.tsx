import React, { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { LaunchesCard } from '../components/LaunchesCard';
import * as gqlTypes from '../types';
import { Backdrop, CircularProgress } from '@mui/material';

const launchesQuery = (page: number) => `
{
  launches(limit: 10, offset: ${page * 10}) {
    id
    launch_date_utc
    mission_id
    mission_name
    details
    launch_success
    
    launch_site {
      site_name_long
      site_name
    }
    links {
      article_link
      flickr_images
    }
  }
}

`;

export const Launches = () => {
  const [launches, setLaunches] = useState<gqlTypes.Launch[]>([]);
  const [page, setPages] = useState<number>(0);
  const [{ fetching, data, error }] = useQuery({ query: launchesQuery(page) });

  useEffect(() => {
    if (data) {
      setLaunches((prevCards) => [...prevCards, ...data.launches]);
    }
    return () => {
      setLaunches([]);
    };
  }, [data]);

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
    <>
      <div className="launches container">
        <div className="row launches__masonry">
          {launches.map((launch: gqlTypes.Launch) => {
            return <LaunchesCard key={launch.id} launch={launch} />;
          })}
        </div>
      </div>
    </>
  );
};
