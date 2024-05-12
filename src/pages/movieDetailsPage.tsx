import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import { DiscoverMovies, MovieT } from "../types/interfaces";
import { ListedMovie } from "../types/interfaces";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getSimilarMovies } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'

const MovieDetailsPage: React.FC = () => {
    const { id } = useParams();
    const { data: movie, error, isLoading, isError } = useQuery<MovieT, Error>(
        ["movie", id],
        () => getMovie(id || "")
    );
    console.log("moviedetailpage", movie)
    const { data: similarMovies, error: moviesError, isLoading: moviesIsLoading, isError: isSimilarMoviesError } = useQuery<DiscoverMovies, Error>(
        ["similar", id],
        () => getSimilarMovies(id || "")
    );



    if (isLoading || moviesIsLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{(error as Error).message}</h1>;
    }
    else if (isSimilarMoviesError) {
        return <h1>{(moviesError as Error).message}</h1>;
    }
    const moviesSimilar = similarMovies ? similarMovies.results : [];

    return (
        <>
            {movie ? (
                <>
                    <PageTemplate movie={movie as MovieT} >
                        <MovieDetails movie={movie as MovieT} similar={moviesSimilar as ListedMovie[]} />
                    </PageTemplate>
                </>
            ) : (
                <p>Waiting for movie details</p>
            )}
        </>
    );
};

export default MovieDetailsPage;