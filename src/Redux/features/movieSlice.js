import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Status from "../../Utilits/Status";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
    name:"",
  status:Status.IDLE,
  popularMovies: [],
  topRatedMovies: [],
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    fetchPopMovies(state, action) {
      state.popularMovies = action.payload;
    },
    fetchTopMovies(state, action) {
      state.topRatedMovies = action.payload;
    },
    changeStatus:(state,action)=>{
        state.status = action.payload
    },
    changeName:(state,action)=>{
        state.name = action.payload
    }

  },
});

export const getTopRatedMovies = () => {
    
  return async function getTopRatedMoviesThunk(dispatch, getState) {
    
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/top_rated",
      params: { language: "en-US", page: "1" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmRlY2Q3YTAxNDU1Yjc0NjcwOTFlNDU0MWYzNjUyYSIsInN1YiI6IjY0ZGJjMTdmZjQ5NWVlMDI5NDMxY2Q5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PPCcqagtnwSsQ5xIy2Qp0A9H-s4MLI4eJLWhUZzOJNc",
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        dispatch(changeStatus(Status.LOADING))
        dispatch(fetchTopMovies(response.data.results));
        dispatch(changeStatus(Status.IDLE))
      })
      .catch(function (error) {
        console.error(error);
        dispatch(changeStatus(Status.ERROR))
      });
  };
};

export const getPopularMovies = () => {
  return async function getPopularMoviesThunk(dispatch, getState) {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular",
      params: { language: "en-US", page: "1" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmRlY2Q3YTAxNDU1Yjc0NjcwOTFlNDU0MWYzNjUyYSIsInN1YiI6IjY0ZGJjMTdmZjQ5NWVlMDI5NDMxY2Q5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PPCcqagtnwSsQ5xIy2Qp0A9H-s4MLI4eJLWhUZzOJNc",
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        dispatch(changeStatus(Status.LOADING))
        dispatch(fetchPopMovies(response.data.results));
        dispatch(changeStatus(Status.IDLE))
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const { fetchPopMovies, fetchTopMovies ,changeStatus,changeName} = movieSlice.actions;
export default movieSlice.reducer;
