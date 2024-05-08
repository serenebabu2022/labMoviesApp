import React, { useState, useEffect, FC } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { ListedMovie } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";

const UpcomingMoviesPage: FC = () => {
    const [movies, setMovies] = useState<ListedMovie[]>([]);
    const favourites = movies.filter(m => m.favourite)
    localStorage.setItem('favourites', JSON.stringify(favourites))


    useEffect(() => {
        getUpcomingMovies().then(movies => {
            setMovies(movies);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PageTemplate
            title="Discover Upcoming Movies"
            movies={movies}
            action={(movie: ListedMovie) => {
                return <AddToPlaylistIcon {...movie} />
            }} />
    );
};
export default UpcomingMoviesPage;