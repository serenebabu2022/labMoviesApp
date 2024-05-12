import React from "react";
import { useParams } from "react-router-dom";
import { DiscoverTVSeries, TVSeries, TVSeriesT } from "../types/interfaces";
import PageTemplate from "../components/templateTVSeriesPage";
import { getSimilarTVSeries, getTVSeriesDetail } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import TVSeriesDetails from "../components/tvSeriesDetails";

const TVSeriesDetailsPage: React.FC = () => {
    const { id } = useParams();
    const { data: tvSeries, error, isLoading, isError } = useQuery<TVSeries, Error>(
        ["tvSeries", id],
        () => getTVSeriesDetail(id || "")
    );
    const { data: similarTVSeries, error: tvSeriesError, isLoading: tvSeriesIsLoading, isError: isSimilarTVSeriesError } = useQuery<DiscoverTVSeries, Error>(
        ["similar", id],
        () => getSimilarTVSeries(id || "")
    );

    if (isLoading || tvSeriesIsLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{(error as Error).message}</h1>;
    }
    else if (isSimilarTVSeriesError) {
        return <h1>{(tvSeriesError as Error).message}</h1>;
    }
    const tvSeriesSimilar = similarTVSeries ? similarTVSeries.results : [];
    return (
        <>
            {tvSeries ? (
                <>
                    <PageTemplate tvSeries={tvSeries as TVSeriesT} >
                        <TVSeriesDetails tvSeries={tvSeries as TVSeriesT} similar={tvSeriesSimilar as TVSeries[]} />
                    </PageTemplate>
                </>
            ) : (
                <p>Waiting for TV Series details</p>
            )}
        </>
    );
};

export default TVSeriesDetailsPage;