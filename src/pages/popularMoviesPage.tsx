import React, { useEffect, useState } from "react"
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import { getPopularMovies } from "../api/tmdb-api";
import { DiscoverMovies, ListedMovie } from "../types/interfaces";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
    titleFilter,
    genreFilter,
} from "../components/movieFilterUI";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'

const titleFiltering = {
    name: "title",
    value: "",
    condition: titleFilter,
};
const genreFiltering = {
    name: "genre",
    value: "0",
    condition: genreFilter,
};

const PopularMoviesPage: React.FC = () => {
    const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("Popular", getPopularMovies);

    const { filterValues, setFilterValues, filterFunction } = useFiltering(
        [],
        [titleFiltering, genreFiltering]
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const changeFilterValues = (type: string, value: string) => {
        const changedFilter = { name: type, value: value };
        const updatedFilterSet =
            type === "title"
                ? [changedFilter, filterValues[1]]
                : [filterValues[0], changedFilter];
        setFilterValues(updatedFilterSet);
    };

    const movies = data ? data.results : [];
    const displayedMovies = filterFunction(movies);

    return (
        <>
            <PageTemplate
                title='Popular Movies'
                movies={displayedMovies}
                action={(movie: ListedMovie) => {
                    return <AddToFavouritesIcon {...movie} />
                }}
            />
            <MovieFilterUI
                onFilterValuesChange={changeFilterValues}
                titleFilter={filterValues[0].value}
                genreFilter={filterValues[1].value}
                isInFavouritesPage={false}
            />
        </>
    );
};

export default PopularMoviesPage;