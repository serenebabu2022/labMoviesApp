import { ReactNode } from "react";

export interface BaseMovie {
    title: string;
    budget: number;
    homepage: string | undefined;
    id: number;
    imdb_id: string;
    original_language: string;
    overview: string;
    release_date: string;
    vote_average: number;
    popularity: number;
    poster_path?: string;
    tagline: string;
    runtime: number;
    revenue: number;
    vote_count: number;
    favourite?: boolean;
}
export interface BaseMovieList {
    movies: BaseMovie[];
}
export interface MovieT extends BaseMovie {
    genres: {
        id: number;
        name: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
}
export interface ListedMovie extends BaseMovie {
    genre_ids: number[];
}
export interface MovieImage {
    file_path: string;
    aspect_ratio?: number; //some props are optional...
    height?: number;
    iso_639_1?: string;
    vote_average?: number;
    vote_count?: number;
    width?: number;
}
export type FilterOption = "title" | "genre" | "mediaType";

export interface Review {
    id: string;
    content: string
    author: string
}
export interface GenreData {
    genres: {
        id: string;
        name: string
    }[];
}

interface DiscoverMovies {
    page: number;
    total_pages: number;
    total_results: number;
    results: BaseMovie[];
}
export interface MovieListPageTemplateProps {
    movies: ListedMovie[];
    title: string;
    action: (m: ListedMovie) => ReactNode;
}
export interface Review {
    author: string,
    content: string,
    agree: boolean,
    rating: number,
    movieId: number,
}
// export interface Actor {
//     actorId: string;
//     actorName: string;
//     actorKnown_for: BaseMovie[];
//     actorProfile_path: number;
//     actorPopularity: float;
// }
export interface TVSeries {
    name: string;
    overview: string;
    first_air_date: string;
    name: string;
    id: number;
    genre_ids: number[];
    poster_path?: string;
    vote_average: string;
    episode_run_time: number;
    revenue: number;
    vote_count: number;
    tagline: string;
    number_of_seasons: number;
    number_of_episodes: number;
}

interface DiscoverTVSeries {
    page: number;
    total_pages: number;
    total_results: number;
    results: TVSeries[];
}
export interface TVSeriesListPageTemplateProps {
    tvSeries: TVSeries[];
    title: string;
    action: (m: TVSeries) => ReactNode;
}
export interface TVSeriesT extends TVSeries {
    genres: {
        id: number;
        name: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
}
export interface TVSeriesImage {
    file_path: string;
    aspect_ratio?: number;
    height?: number;
    iso_639_1?: string;
    vote_average?: number;
    vote_count?: number;
    width?: number;
}