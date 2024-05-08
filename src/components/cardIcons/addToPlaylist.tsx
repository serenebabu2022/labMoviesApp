import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlayListAddIcon from "@mui/icons-material/PlaylistAdd";
import { ListedMovie } from "../../types/interfaces"

const AddToPlaylistIcon: React.FC<ListedMovie> = (movie) => {
    const context = useContext(MoviesContext);

    const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        context.addToWatchList(movie);
    };
    return (
        <IconButton aria-label="add to playlist" onClick={onUserSelect}>
            <PlayListAddIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default AddToPlaylistIcon;