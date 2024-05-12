import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import img from '../../images/film-poster-placeholder.png';
import { TVSeries } from "../../types/interfaces";
import PlayListAddIcon from "@mui/icons-material/PlaylistAdd";

const styles = {
    card: { maxWidth: 345 },
    media: { height: 500 },
    avatar: {
        backgroundColor: "rgb(255, 0, 0)",
    },
};

interface TVSeriesProps {
    tvSeries: TVSeries,
    action: (m: TVSeries) => React.ReactNode;
}

const TVSeriesCard: React.FC<TVSeriesProps> = (props) => {
    const tvSeries = { ...props.tvSeries, favourite: false, mustWatch: false };
    // const { favourites } = useContext(MoviesContext);
    // const { mustWatchList } = useContext(MoviesContext);

    // if (favourites.find((id) => id === tvSeries.id))
    //     tvSeries.favourite = true;
    // if (mustWatchList.find((id) => id === tvSeries.id))
    //     tvSeries.mustWatch = true;

    return (
        <Card sx={styles.card}>
            <CardHeader
                avatar=
                {tvSeries.favourite ? (
                    <Avatar sx={styles.avatar}>
                        <FavoriteIcon />
                    </Avatar>
                ) : tvSeries.mustWatch ? (
                    <Avatar sx={styles.avatar}>
                        <PlayListAddIcon />
                    </Avatar>
                ) : null}
                title={
                    <Typography variant="h6" component="p">
                        {tvSeries.name}{" "}
                    </Typography>
                }
            />
            <CardMedia
                sx={styles.media}
                image={
                    tvSeries.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${tvSeries.poster_path}`
                        : img
                }
            />
            <CardContent>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1" component="p">
                            <CalendarIcon fontSize="small" />
                            {tvSeries.first_air_date}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1" component="p">
                            <StarRateIcon fontSize="small" />
                            {"  "} {tvSeries.vote_average}{" "}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions disableSpacing>
                {props.action(tvSeries)}
                <Link to={`/tvseries/${tvSeries.id}`}>
                    <Button variant="outlined" size="small" color="primary">
                        More Info ...
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}

export default TVSeriesCard;