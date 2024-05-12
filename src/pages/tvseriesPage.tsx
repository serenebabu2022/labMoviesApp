import PageTemplate from "../components/templateTVSeries";
import { getTVSeries } from "../api/tmdb-api";
import { DiscoverTVSeries, TVSeries } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import { useState } from "react"
import Pagination from "../components/pagination";

const TVSeriesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, error, isLoading, isError } = useQuery<DiscoverTVSeries, Error>(
        ["tvSeries", currentPage],
        () => getTVSeries(currentPage),
        {
            keepPreviousData: true, // To keep previous data 
        }
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }


    const tvseries = data ? data.results : [];

    return (
        <>
            <PageTemplate
                title="TV Series"
                tvSeries={tvseries}
                action={(tv: TVSeries) => {
                    return <AddToFavouritesIcon {...tv} />
                }} />
            <Pagination
                currentPage={currentPage}
                totalPages={data?.total_pages || 1}
                onPageChange={setCurrentPage}
            />
        </>
    );
};
export default TVSeriesPage;