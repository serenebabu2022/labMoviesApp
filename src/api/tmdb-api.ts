export const getMovies = () => {
    return fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    ).then((response) => {
        if (!response.ok)
            throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};
export const getMovie = (id: string) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(`Failed to get movie data. Response status: ${response.status}`);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getGenres = () => {
    return fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US"
    ).then((response) => {
        if (!response.ok)
            throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getMovieImages = (id: string | number) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error("failed to fetch images");
        }
        return response.json();
    }).then((json) => json.posters)
        .catch((error) => {
            throw error
        });
};
export const getMovieReviews = (id: string | number) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
        .then((res) => res.json())
        .then((json) => {
            // console.log(json.results);
            return json.results;
        });
};
export const getUpcomingMovies = () => {
    return fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    )
        .then((response) => {
            if (!response.ok)
                throw new Error(`Unable to fetch upcoming movies. Response status: ${response.status}`);
            return response.json();
        })
        .catch((error) => {
            throw error
        });
};
export const getPopularMovies = () => {
    return fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    )
        .then((response) => {
            if (!response.ok)
                throw new Error(`Unable to fetch popular movies. Response status: ${response.status}`);
            return response.json();
        })
        .catch((error) => {
            throw error
        });
};
export const getSimilarMovies = (id: string) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(`Failed to get similar movies data. Response status: ${response.status}`);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};
export const getActor = () => {
    return fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    )
        .then((response) => {
            if (!response.ok)
                throw new Error(`Unable to actor. Response status: ${response.status}`);
            return response.json();
        })
        .catch((error) => {
            throw error
        });
};
export const getTVSeries = () => {
    return fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    )
        .then((response) => {
            if (!response.ok)
                throw new Error(`Unable to fetch tv series. Response status: ${response.status}`);
            return response.json();
        })
        .catch((error) => {
            throw error
        });
};
export const getTVSeriesDetail = (id: string) => {
    return fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(`Failed to get tv series data. Response status: ${response.status}`);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};
export const getTVSeriesImages = (id: string | number) => {
    return fetch(
        `https://api.themoviedb.org/3/tv/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
        // `https://api.themoviedb.org/3/tv/59941/images?api_key=c90fce0238bd9075c4071a3ebf4448c1`
    ).then((response) => {
        if (!response.ok) {
            throw new Error("failed to fetch images");
        }
        return response.json();
    }).then((json) => json.posters)
        .catch((error) => {
            throw error
        });
};
export const getSimilarTVSeries = (id: string) => {
    return fetch(
        `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(`Failed to get similar tv series data. Response status: ${response.status}`);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};