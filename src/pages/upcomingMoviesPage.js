import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getUpcomingMovies} from '../api/tmdb-api'
import AddToMustWatchListIcon from '../components/cardIcons/addToMustWatchList'

const UpcomingMoviesPage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('upcoming', getUpcomingMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  const mustWatches = movies.filter(m => m.mustWatches)
  localStorage.setItem('mustWatches', JSON.stringify(mustWatches))


  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <AddToMustWatchListIcon movie={movie} />
      }}
    />
);
};

export default UpcomingMoviesPage;

