import React, { useState } from "react";
import { ListedMovie, MovieT, Review } from "../types/interfaces";

interface MovieContextInterface {
    favourites: number[];
    mustWatchList: number[];
    addToFavourites: ((movie: ListedMovie) => void);
    removeFromFavourites: ((movie: ListedMovie) => void);
    addReview: ((movie: MovieT, review: Review) => void);
    addToWatchList: ((movie: ListedMovie) => void);
}
const initialContextState: MovieContextInterface = {
    favourites: [],
    mustWatchList: [],
    addToFavourites: (movie) => { movie.id },
    removeFromFavourites: (movie) => { movie.id },
    addReview: (movie, review) => { movie.id, review },
    addToWatchList: (movie) => { movie.id }
};


export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = (props) => {
    const [myReviews, setMyReviews] = useState<Review[]>([])
    const [favourites, setFavourites] = useState<number[]>([]);
    const [mustWatchList, setMustWatchList] = useState<number[]>([]);

    const addToFavourites = (movie: ListedMovie) => {
        const updatedFavourites = [...favourites];
        if (!favourites.includes(movie.id)) {
            updatedFavourites.push(movie.id);
        }
        setFavourites(updatedFavourites);
    };
    const addToWatchList = (movie: ListedMovie) => {
        const updatedMoviePlaylist = [...mustWatchList];
        if (!mustWatchList.includes(movie.id)) {
            updatedMoviePlaylist.push(movie.id);
        }
        setMustWatchList(updatedMoviePlaylist);
    };


    const addReview = (movie: MovieT, review: Review) => {
        setMyReviews({ ...myReviews, [movie.id]: review })
    };

    // We will use this function in a later section
    const removeFromFavourites = (movie: ListedMovie) => {
        setFavourites(favourites.filter((mId) => mId !== movie.id));
    };

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                mustWatchList,
                addToFavourites,
                removeFromFavourites,
                addReview,
                addToWatchList
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;