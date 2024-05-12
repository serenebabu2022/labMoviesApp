import React from "react";
import TvSeries from "../TVSeriesCard";
import Grid from "@mui/material/Grid";
import { TVSeries } from "../../types/interfaces";

interface TVSeriesListProps {
    tvSeries: TVSeries[],
    action: (m: TVSeries) => React.ReactNode;
    similarMovies?: boolean;
}

const TVSeriesList: React.FC<TVSeriesListProps> = (props) => {

    const { tvSeries, similarMovies } = props;

    let tvSeriesArray: TVSeries[] = [];
    if (Array.isArray(tvSeries)) {
        tvSeriesArray = tvSeries;
    } else {
        tvSeriesArray = [tvSeries];
    }

    const TVSeriesCards = tvSeriesArray.map((m) => (
        similarMovies ? (
            <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={3}>
                <TvSeries key={m.id} tvSeries={m} action={props.action} />
            </Grid>
        ) : (
            <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                <TvSeries key={m.id} tvSeries={m} action={props.action} />
            </Grid>
        )
    ));
    return TVSeriesCards;
}

export default TVSeriesList;