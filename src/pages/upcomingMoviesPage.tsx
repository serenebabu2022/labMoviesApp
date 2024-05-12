import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { DiscoverMovies, ListedMovie } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
    titleFilter,
    genreFilter,
} from "../components/movieFilterUI";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToPlayListIcon from '../components/cardIcons/addToPlaylist';

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

const UpcomingMoviesPage: React.FC = () => {

    const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("UpComing", getUpcomingMovies);
    const { filterValues, setFilterValues, filterFunction } = useFiltering(
        [],
        [titleFiltering, genreFiltering]
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError || !data) {
        return <h1>{error ? error.message : "Error fetching data"}</h1>;
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
    console.log("upcomingMoviesPage");
    return (
        <>
            <PageTemplate
                title='Upcoming Movies'
                movies={displayedMovies}
                action={(movie: ListedMovie) => {
                    return <AddToPlayListIcon {...movie} />
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
export default UpcomingMoviesPage;