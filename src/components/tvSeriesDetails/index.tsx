import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { MovieT, TVSeries, TVSeriesT } from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from '../movieReviews';
import Grid from "@mui/material/Grid";
import { ListedMovie } from "../../types/interfaces";
import TVSeriesList from "../TVSeriesList";
import AddToFavouritesIcon from '../../components/cardIcons/addToFavourites'

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
interface tvSeriesPageProps {
    tvSeries: TVSeriesT;
    similar?: TVSeries[];
}

const TVSeriesDetails: React.FC<tvSeriesPageProps> = (props) => {
    const { tvSeries, similar } = props;

    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {tvSeries.overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {tvSeries.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <Chip icon={<AccessTimeIcon />} label={`${tvSeries.episode_run_time} min.`} />
                {/* <Chip
                    icon={<MonetizationIcon />}
                    label={`${tvSeries.revenue.toLocaleString()}`}
                /> */}
                <Chip
                    icon={<StarRate />}
                    label={`${tvSeries.vote_average} (${tvSeries.vote_count}`}
                />
                <Chip label={`Released: ${tvSeries.first_air_date}`} />
            </Paper>
            <Grid item container spacing={3} marginTop={2}>
                {similar && <TVSeriesList action={(movie: TVSeries) => {
                    return <AddToFavouritesIcon {...movie} />
                }} tvSeries={similar} similarMovies={true} />}
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
            {/* <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <MovieReviews {...tvSeries} />
            </Drawer> */}
        </>
    );
};
export default TVSeriesDetails;