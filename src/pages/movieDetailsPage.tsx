import React, { useState, useEffect } from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import { DiscoverMovies, MovieT, TVSeriesT } from "../types/interfaces";
import { ListedMovie } from "../types/interfaces";
import PageTemplate from "../components/templateMoviePage";
import { getActor, getMovie, getPopularMovies, getSimilarMovies, getSimilarTVSeries } from '../api/tmdb-api'
import { useQuery, useQueries } from "react-query";
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
    // const [movieActor, setMovieActor] = useState<Actor[]>([]);
    // useEffect(() => {
    //     fetch(
    //         `https://api.themoviedb.org/3/person/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    //     )
    //         .then((res) => res.json())
    //         .then((json) => {
    //             return json.results;
    //         })
    //         .then((actor) => {
    //             setMovieActor(actor);
    //             // console.log("data in movie", movie)
    //         });
    // }, []);
    // const [similar, setSimilar] = useState<ListedMovie[]>([]);
    // useEffect(() => {
    //     fetch(
    //         `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    //     )
    //         .then((res) => res.json())
    //         .then((json) => {
    //             return json.results;
    //         })
    //         .then((movies) => {
    //             setSimilar(movies);
    //         });
    // }, []);
    // console.log("similarmovie", similar)
    // console.log("data in actor", movieActor)

    // if (movieActor) {
    //     movieActor.map((actor) => {

    //     })
    //     console.log("Actor exists in movie:", movie.actor);
    //     if (!movie.actor) {
    //         movie.actor = movieActor;
    //         console.log("Assigned details to actor:", movie.actor);
    //     }
    // }


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