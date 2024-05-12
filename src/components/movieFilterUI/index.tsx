import React, { useState } from "react";
import FilterCard from "../filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { ListedMovie, TVSeries } from "../../types/interfaces";

export const titleFilter = function (movie: ListedMovie, value: string) {
    console.log("titlefilter", movie.title.toLowerCase().search(value.toLowerCase()))
    return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = function (movie: ListedMovie, value: string) {
    const genreId = Number(value);
    return genreId > 0 ? movie.genre_ids.includes(genreId) : true;
};
// export const mediaTypeFilter = function (media: ListedMovie, value: string) {
//     const mediaType = value.toLowerCase();
//     console.log("mediatype", mediaType);
//     console.log("media", media);
//     if (mediaType === "all") {
//         return true; // Include all media types
//     } else if (mediaType === "movie") {
//         return true; // Include only movies
//     } else if (mediaType === "tv") {
//         return true; // Include only TV series
//     } else {
//         return false; // Invalid media type, exclude it
//     }
// };
export const ratingFilter = function (movie: ListedMovie, value: string) {
    const minRating = parseFloat(value);
    return movie.vote_average >= minRating; // Direct comparison with float
};

const styles = {
    root: {
        backgroundColor: "#bfbfbf",
    },
    fab: {
        marginTop: 8,
        position: "fixed",
        top: 20,
        right: 2,
    },
};

interface MovieFilterUIProps {
    onFilterValuesChange: (f: string, s: string) => void;
    titleFilter: string;
    genreFilter: string;
    // mediaTypeFilter: string;
    ratingFilter: string;
    isInFavouritesPage: boolean;
}


const MovieFilterUI: React.FC<MovieFilterUIProps> = ({ onFilterValuesChange, titleFilter, genreFilter, ratingFilter, isInFavouritesPage }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                Filter
            </Fab>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <FilterCard
                    onUserInput={onFilterValuesChange}
                    titleFilter={titleFilter}
                    genreFilter={genreFilter}
                    isInFavouritesPage={isInFavouritesPage}
                    ratingFilter={ratingFilter}
                />
            </Drawer>
        </>
    );
};

export default MovieFilterUI;