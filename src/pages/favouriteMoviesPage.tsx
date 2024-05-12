import React, { useContext } from "react"
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
    titleFilter
} from "../components/movieFilterUI";
import { MovieT } from "../types/interfaces";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";

const titleFiltering = {
    name: "title",
    value: "",
    condition: titleFilter,
};

export const genreFiltering = {
    name: "genre",
    value: "0",
    condition: function (movie: MovieT, value: string) {
        // Is user selected genre in this movies's genre list? 
        // Always true if selected genre ia All (0).
        const genreId = Number(value);
        const genre_ids = movie.genres.map((g) => g.id);
        return genreId > 0 ? genre_ids.includes(genreId) : true;
    },
};
// const mediaTypeFiltering = {
//     name: "mediaType",
//     value: "0",
//     condition: mediaTypeFilter,
// };

const FavouriteMoviesPage: React.FC = () => {
    const { favourites: movieIds } = useContext(MoviesContext);
    const { filterValues, setFilterValues, filterFunction } = useFiltering(
        [],
        [titleFiltering, genreFiltering]
    );
    console.log("favourites in fav", movieIds)
    // Create an array of queries and run them in parallel.
    const favouriteMovieQueries = useQueries(
        movieIds.map((movieId) => {
            return {
                queryKey: ["movie", movieId],
                queryFn: () => getMovie(movieId.toString()),
            };
        })
    );
    // Check if any of the parallel queries is still loading.
    const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

    if (isLoading) {
        return <Spinner />;
    }

    const allFavourites = favouriteMovieQueries.map((q) => q.data);
    const displayMovies = allFavourites
        ? filterFunction(allFavourites)
        : [];

    const changeFilterValues = (type: string, value: string) => {
        // let updatedFilterSet: { name: string; value: string }[];
        // // Determine which filter is being updated and update the filter set accordingly
        // if (type === "title") {
        //     updatedFilterSet = [{ name: type, value: value }, filterValues[1]];
        // } else if (type === "genre") {
        //     updatedFilterSet = [filterValues[0], { name: type, value: value }];
        // } else if (type === "mediaType") {
        //     updatedFilterSet = [filterValues[0], filterValues[1], { name: type, value: value }];
        // } else {
        //     // Handle unknown filter types
        //     console.error("Unknown filter type:", type);
        //     return;
        // }

        const changedFilter = { name: type, value: value };
        const updatedFilterSet =
            type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
        setFilterValues(updatedFilterSet);
    };

    return (
        <>
            <PageTemplate
                title="Favourite Movies And TVSeries"
                movies={displayMovies}
                action={(movie) => {
                    return (
                        <>
                            <RemoveFromFavourites {...movie} />
                            <WriteReview {...movie} />
                        </>
                    );
                }}
            />
            <MovieFilterUI
                onFilterValuesChange={changeFilterValues}
                titleFilter={filterValues[0].value}
                genreFilter={filterValues[1].value}
                isInFavouritesPage={true}
            />
        </>
    );
};

export default FavouriteMoviesPage;