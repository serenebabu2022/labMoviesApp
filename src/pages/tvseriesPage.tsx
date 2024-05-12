import PageTemplate from "../components/templateTVSeries";
import { getTVSeries } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
    titleFilter,
    genreFilter,
} from "../components/movieFilterUI";
import { DiscoverTVSeries, TVSeries } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import React, { useEffect, useState } from "react"
import Pagination from "../components/pagination";

// const titleFiltering = {
//     name: "title",
//     value: "",
//     condition: titleFilter,
// };
// const genreFiltering = {
//     name: "genre",
//     value: "0",
//     condition: genreFilter,
// };

const TVSeriesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, error, isLoading, isError } = useQuery<DiscoverTVSeries, Error>(
        ["tvSeries", currentPage],
        () => getTVSeries(currentPage),
        {
            keepPreviousData: true, // To keep previous data 
        }
    );
    // const { data, error, isLoading, isError } = useQuery<DiscoverTVSeries, Error>("tvSeries", getTVSeries);
    // const { filterValues, setFilterValues, filterFunction } = useFiltering(
    //     [],
    //     [titleFiltering, genreFiltering]
    // );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }


    // const changeFilterValues = (type: string, value: string) => {
    //     const changedFilter = { name: type, value: value };
    //     const updatedFilterSet =
    //         type === "title"
    //             ? [changedFilter, filterValues[1]]
    //             : [filterValues[0], changedFilter];
    //     setFilterValues(updatedFilterSet);
    // };

    const tvseries = data ? data.results : [];
    console.log('ger', tvseries)
    // const displayedTVSeries = filterFunction(tvseries);

    return (
        <>
            <PageTemplate
                title="TV Series"
                tvSeries={tvseries}
                action={(tv: TVSeries) => {
                    return <AddToFavouritesIcon {...tv} />
                }} />
            {/* <MovieFilterUI
                onFilterValuesChange={changeFilterValues}
                titleFilter={filterValues[0].value}
                genreFilter={filterValues[1].value}
            /> */}
            <Pagination
                currentPage={currentPage}
                totalPages={data?.total_pages || 1}
                onPageChange={setCurrentPage}
            />
        </>
    );
};
export default TVSeriesPage;