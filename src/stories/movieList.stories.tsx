
import type { Meta } from '@storybook/react';
import MovieList from "../components/movieList";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";

import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import Grid from "@mui/material/Grid";
import MoviesContextProvider from "../contexts/moviesContext";


const meta = {
  title: "Home Page/MovieList",
  component: MovieList,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
    (Story) => <MoviesContextProvider><Story /></MoviesContextProvider>,
  ],

} satisfies Meta<typeof MovieList>;
export default meta;


export const Basic = () => {
  const movies = [
    { ...SampleMovie.movie, id: 1 },
    { ...SampleMovie.movie, id: 2 },
    { ...SampleMovie.movie, id: 3 },
    { ...SampleMovie.movie, id: 4 },
    { ...SampleMovie.movie, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <MovieList
        movies={movies}
        action={(movie) => <AddToFavouritesIcon {...movie} />}
      />
    </Grid>
  );
};
Basic.storyName = "Default";


