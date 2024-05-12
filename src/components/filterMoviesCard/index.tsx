import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import React, { ChangeEvent, useState } from "react";
import { FilterOption, GenreData } from "../../types/interfaces"
import { FormControlLabel, SelectChangeEvent } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

const styles = {
    root: {
        maxWidth: 345,
    },
    media: { height: 300 },

    formControl: {
        margin: 1,
        minWidth: 220,
        backgroundColor: "rgb(255, 255, 255)",
    },
};
interface FilterMoviesCardProps {
    onUserInput: (f: FilterOption, s: string) => void; // Add this line
    titleFilter: string;
    genreFilter: string;
    isInFavouritesPage: boolean;
    ratingFilter: string;
}

const FilterMoviesCard: React.FC<FilterMoviesCardProps> = (props) => {
    const [rating, setRating] = useState(0.0);
    const { data, error, isLoading, isError } = useQuery<GenreData, Error>("genres", getGenres);

    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
        return <h1>{(error as Error).message}</h1>;
    }
    const genres = data?.genres || [];
    if (genres[0].name !== "All") {
        genres.unshift({ id: "0", name: "All" });
    }

    const handleChange = (e: SelectChangeEvent, type: FilterOption, value: string) => {
        e.preventDefault()
        props.onUserInput(type, value)
    };

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e, "title", e.target.value)
    }

    const handleGenreChange = (e: SelectChangeEvent) => {
        handleChange(e, "genre", e.target.value)
    };
    const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newRating = parseFloat(event.target.value); // Parse value as float
        setRating(newRating);
        props.onUserInput('rating', newRating.toString()); // Convert back to string
    };

    return (
        <>
            <Card sx={styles.root} variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h1">
                        <FilterAltIcon fontSize="large" />
                        Filter the movies.
                    </Typography>
                    <TextField
                        sx={styles.formControl}
                        id="filled-search"
                        label="Search field"
                        type="search"
                        value={props.titleFilter}
                        variant="filled"
                        onChange={handleTextChange}
                    />
                    <FormControl sx={styles.formControl}>
                        <InputLabel id="genre-label">Genre</InputLabel>
                        <Select
                            labelId="genre-label"
                            id="genre-select"
                            value={props.genreFilter}
                            onChange={handleGenreChange}
                        >
                            {genres.map((genre) => {
                                return (
                                    <MenuItem key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    {/* {props.isInFavouritesPage && */}
                    {/* <FormControl sx={styles.formControl}>
                            <InputLabel id="rating-label">Media Type</InputLabel>
                            <Select
                                labelId="rating-label"
                                id="rating-select"
                                value={props.ratingFilter}
                                onChange={handleRatingChange}
                            >
                                {mediaTypes.map((type) => (
                                    <MenuItem key={type.key} value={type.key}>
                                        {type.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl> */}
                    {/* } */}
                    <FormControl sx={styles.formControl}>
                        {/* <InputLabel id="rating-label">Genre</InputLabel> */}
                        <Typography>Rating</Typography>
                        <RadioGroup
                            aria-label="rating"
                            name="rating"
                            value={rating.toString()} // Convert rating to string for comparison
                            onChange={handleRatingChange}
                            sx={{ flexDirection: 'row' }} // Align radio buttons horizontally
                        >
                            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((value) => (
                                <FormControlLabel
                                    key={value}
                                    value={value} // Use the actual value for filtering
                                    control={<Radio color="primary" />}
                                    label={`>= ${value}`} // Display label with "greater than or equal to"
                                />
                            ))}
                        </RadioGroup></FormControl>
                </CardContent>
            </Card>
            <Card sx={styles.root} variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h1">
                        <SortIcon fontSize="large" />
                        Sort the movies.
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default FilterMoviesCard;