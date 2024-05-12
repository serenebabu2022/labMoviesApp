import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import TvSeriesList from "../TVSeriesList";
import { TVSeriesListPageTemplateProps } from "../../types/interfaces";

const styles = {
    root: {
        backgroundColor: "#bfbfbf",
    }
};

const TVSeriesPageTemplate: React.FC<TVSeriesListPageTemplateProps> = (props) => {
    return (
        <Grid container sx={styles.root}>
            <Grid item xs={12}>
                <Header title={props.title} />
            </Grid>
            <Grid item container spacing={5}>
                <TvSeriesList action={props.action} tvSeries={props.tvSeries} />
            </Grid>
        </Grid>
    );
}
export default TVSeriesPageTemplate;