import React, { useContext } from "react";
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
import { MoviesContext } from "../../contexts/moviesContext";
import { ListedMovie } from "../../types/interfaces";
import PlayListAddIcon from "@mui/icons-material/PlaylistAdd";

const styles = {
    card: { maxWidth: 345 },
    media: { height: 500 },
    avatar: {
        backgroundColor: "rgb(255, 0, 0)",
    },
};

interface MovieListProps {
    movie: ListedMovie,
    action: (m: ListedMovie) => React.ReactNode;
}

const MovieCard: React.FC<MovieListProps> = (props) => {
    const movie = { ...props.movie, favourite: false, mustWatch: false };
    const { favourites } = useContext(MoviesContext);
    const { mustWatchList } = useContext(MoviesContext);

    if (favourites.find((id) => id === movie.id))
        movie.favourite = true;
    if (mustWatchList.find((id) => id === movie.id))
        movie.mustWatch = true;

    return (
        <Card sx={styles.card}>
            <CardHeader
                avatar=
                {movie.favourite ? (
                    <Avatar sx={styles.avatar}>
                        <FavoriteIcon />
                    </Avatar>
                ) : movie.mustWatch ? (
                    <Avatar sx={styles.avatar}>
                        <PlayListAddIcon />
                    </Avatar>
                ) : null}
                title={
                    <Typography variant="h6" component="p">
                        {movie.title}{" "}
                    </Typography>
                }
            />
            <CardMedia
                sx={styles.media}
                image={
                    movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : img
                }
            />
            <CardContent>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1" component="p">
                            <CalendarIcon fontSize="small" />
                            {movie.release_date}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1" component="p">
                            <StarRateIcon fontSize="small" />
                            {"  "} {movie.vote_average}{" "}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions disableSpacing>
                {props.action(movie)}
                <Link to={`/movies/${movie.id}`}>
                    <Button variant="outlined" size="small" color="primary">
                        More Info ...
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}

export default MovieCard;