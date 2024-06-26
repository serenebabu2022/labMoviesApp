import React, { useState } from "react";
import FilterCard from "../filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { ListedMovie } from "../../types/interfaces";

export const titleFilter = function (movie: ListedMovie, value: string) {
    return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = function (movie: ListedMovie, value: string) {
    const genreId = Number(value);
    return genreId > 0 ? movie.genre_ids.includes(genreId) : true;
};
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

interface TVSeriesFilterUIProps {
    onFilterValuesChange: (f: string, s: string) => void;
    titleFilter: string;
    genreFilter: string;
    ratingFilter: string;
}


const TVSeriesFilterUI: React.FC<TVSeriesFilterUIProps> = ({ onFilterValuesChange, titleFilter, genreFilter, ratingFilter }) => {
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
                    isInFavouritesPage={false}
                    ratingFilter={ratingFilter}
                />
            </Drawer>
        </>
    );
};

export default TVSeriesFilterUI;