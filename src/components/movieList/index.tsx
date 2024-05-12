import React from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";
import { ListedMovie } from "../../types/interfaces";

interface MovieListProps {
    movies: ListedMovie[],
    action: (m: ListedMovie) => React.ReactNode;
    similarMovies?: boolean;
}

const MovieList: React.FC<MovieListProps> = (props) => {
    const { movies, similarMovies } = props;
    console.log("MovieLis", movies);
    console.log("similar", similarMovies);

    let moviesArray: ListedMovie[] = [];
    if (Array.isArray(movies)) {
        moviesArray = movies;
    } else {
        moviesArray = [movies];
    }

    const movieCards = moviesArray.map((m) => (
        <Grid key={`grid-${m.id}`} item xs={12} sm={6} md={4} lg={3} xl={similarMovies ? 3 : 2}>
            <Movie key={m.id} movie={m} action={props.action} />
        </Grid>
    ));
    return movieCards;
}

export default MovieList;