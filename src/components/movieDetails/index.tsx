import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { MovieT } from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from '../movieReviews';
import Grid from "@mui/material/Grid";
import { ListedMovie } from "../../types/interfaces";
import MovieList from "../movieList";
import AddToFavouritesIcon from '../../components/cardIcons/addToFavourites'
import { Button } from "@mui/material";
import { Link } from "@mui/icons-material";

const styles = {
    chipSet: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 1.5,
        margin: 0,
        marginTop: 2
    },
    chipLabel: {
        margin: 0.5,
    },
    fab: {
        position: "fixed",
        top: 50,
        right: 2,
    },
};
interface moviePageProps {
    movie: MovieT;
    similar?: ListedMovie[];
}

const MovieDetails: React.FC<moviePageProps> = (props) => {
    const { movie, similar } = props;
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {movie.overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {movie.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
                <Chip
                    icon={<MonetizationIcon />}
                    label={`${movie.revenue.toLocaleString()}`}
                />
                <Chip
                    icon={<StarRate />}
                    label={`${movie.vote_average} (${movie.vote_count}`}
                />
                <Chip label={`Released: ${movie.release_date}`} />
            </Paper>
            <Link to="https://api.themoviedb.org/3/movie/967847/videos?api_key=c90fce0238bd9075c4071a3ebf4448c1&language=en-US&include_adult=false&include_video=true">
                <Button variant="outlined" size="small" color="primary">
                    More Info ...
                </Button>
            </Link>
            <Grid item container spacing={3} marginTop={2}>
                {similar && <MovieList action={(movie: ListedMovie) => {
                    return <AddToFavouritesIcon {...movie} />
                }} movies={similar} similarMovies={true} />}
            </Grid>

            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                <NavigationIcon />
                Reviews
            </Fab>
            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <MovieReviews {...movie} />
            </Drawer>
        </>
    );
};
export default MovieDetails;