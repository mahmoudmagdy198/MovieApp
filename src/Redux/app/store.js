import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/movieSlice"
import counterReducer from "../features/counterSlice"
import SearchMovieSlice from "../features/SearchMovieSlice";
import FavMovieAddSlice from "../features/FavMovieAddSlice";

export const store = configureStore({
    reducer: {
        movie: movieReducer,
        count: counterReducer,
        searchMovie: SearchMovieSlice,
        favMoviesAdd: FavMovieAddSlice
    },
})