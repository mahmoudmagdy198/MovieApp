import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Status from "../../Utilits/Status";

const initialState = {
    status: Status.IDLE,
    title: "",
    pageNum: 1,
    searchedMovies: [],
};

export const searchedMovieSlice = createSlice({
  name: "searchedMovies",
  initialState,
  reducers: {
    increment: (state) => {
      state.pageNum += 1;
    },
    decrement: (state) => {
      if (state.pageNum != 1) {
        state.pageNum -= 1;
      }
    },
    noChange: (state) => {
      state.pageNum = state.pageNum;
    },
    reset: (state, action) => {
      state.pageNum = action.payload;
    },
    changeName: (state, action) => {
      state.title = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchedMovies.fulfilled, (state, action) => {
        state.status = Status.IDLE
        state.searchedMovies = action.payload;
    });
    builder.addCase(getSearchedMovies.pending,(state, action) =>{
        state.status = Status.LOADING
    });
    builder.addCase(getSearchedMovies.rejected, (state,action) =>{
        state.status = Status.ERROR
    })
  },
});

export const getSearchedMovies = createAsyncThunk(
  "searchedMovies/get",
  async (data) => {
    const {titleRedux,pageRedux} = data
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/movie",
      params: {
        query: `${titleRedux}`,
        include_adult: "false",
        language: "en-US",
        page: `${pageRedux}`,
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmRlY2Q3YTAxNDU1Yjc0NjcwOTFlNDU0MWYzNjUyYSIsInN1YiI6IjY0ZGJjMTdmZjQ5NWVlMDI5NDMxY2Q5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PPCcqagtnwSsQ5xIy2Qp0A9H-s4MLI4eJLWhUZzOJNc",
      },
    };
    const response = await axios.request(options);
    return response.data.results;
  }
);

export const { increment, decrement, reset, changeName } =
  searchedMovieSlice.actions;
export default searchedMovieSlice.reducer;
