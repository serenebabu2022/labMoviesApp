import React, { useState } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { DiscoverMovies, ListedMovie } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
    titleFilter,
    genreFilter,
    ratingFilter,
} from "../components/movieFilterUI";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToPlayListIcon from '../components/cardIcons/addToPlaylist';
import Pagination from "../components/pagination";

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
const ratingFiltering = {
    name: "genre",
    value: "0",
    condition: ratingFilter,
};

const UpcomingMoviesPage: React.FC = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
        ["UpComing", currentPage],
        () => getUpcomingMovies(currentPage),
        {
            keepPreviousData: true, // To keep previous data 
        }
    );
    const { filterValues, setFilterValues, filterFunction } = useFiltering(
        [],
        [titleFiltering, genreFiltering, ratingFiltering]
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError || !data) {
        return <h1>{error ? error.message : "Error fetching data"}</h1>;
    }

    const changeFilterValues = (type: string, value: string) => {
        const changedFilter = { name: type, value: value };
        let updatedFilterSet;
        if (type === "title") {
            updatedFilterSet = [changedFilter, filterValues[1]], filterValues[2];
        } else if (type === "genre") {
            updatedFilterSet = [filterValues[0], changedFilter, filterValues[2]];
        }
        else if (type === "rating") {
            updatedFilterSet = [filterValues[0], filterValues[1], changedFilter];
        }
        else {
            // Handle unknown filter types
            console.error("Unknown filter type:", type);
            return;
        }
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
                ratingFilter={filterValues[2].value}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={data?.total_pages || 1}
                onPageChange={setCurrentPage}
            />
        </>
    );
};
export default UpcomingMoviesPage;