import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { TVSeriesT } from "../../types/interfaces";

const styles = {
    root: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        padding: 1.5,
    },
    avatar: {
        backgroundColor: "rgb(255, 0, 0)",
    },
};

const TVSeriesHeader: React.FC<TVSeriesT> = (props) => {
    // Retrieve the item from local storage
    const favouritesJSON = localStorage.getItem('favourites');
    let favourites;
    // Parse the JSON string back into a JavaScript object
    if (favouritesJSON) {
        favourites = JSON.parse(favouritesJSON);
    }

    return (
        <Paper component="div" sx={styles.root}>
            <IconButton aria-label="go back">
                <ArrowBackIcon color="primary" fontSize="large" />
            </IconButton>
            {favourites.length != 0 ? (
                <Avatar sx={styles.avatar}>
                    <FavoriteIcon />
                </Avatar>
            ) : null
            }
            <Typography variant="h4" component="h3">
                {props.name}{"   "}
                {/* <a href={props.homepage}>
                    <HomeIcon color="primary" fontSize="large" />
                </a> */}
                <br />
                <span>{`${props.tagline}`} </span>
            </Typography>
            <IconButton aria-label="go forward">
                <ArrowForwardIcon color="primary" fontSize="large" />
            </IconButton>
        </Paper>
    );
};

export default TVSeriesHeader;