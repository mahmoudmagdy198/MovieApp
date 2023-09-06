import React from "react";
import "./SearchResults.css";
import Header from "./Header";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import Loader from "./Loader";
import CardMovie from "./CardMovie";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  getSearchedMovies,
} from "../Redux/features/SearchMovieSlice";
import Status from "../Utilits/Status";

function SearchResults() {
  const pageRedux = useSelector((state) => state.searchMovie.pageNum);
  const statusRedux = useSelector((state) => state.searchMovie.status);
  const titleRedux = useSelector((state) => state.searchMovie.title);
  const searchedMovieRedux = useSelector(
    (state) => state.searchMovie.searchedMovies
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (titleRedux !== "") {
      dispatch(getSearchedMovies({ titleRedux, pageRedux }));
    }
  }, [titleRedux, pageRedux]);

  const renderSearchPage = (
    <div className="searchedMovie">
      <h1>Results:</h1>
      <div className="cards">
        <Grid container spacing={1}>
          {searchedMovieRedux?.length !== 0 ? (
            searchedMovieRedux?.map((ele) => (
              <Grid item sm={1.5}>
                <CardMovie key={ele.id} movie={ele} />
              </Grid>
            ))
          ) : (
            <h1 style={{ position: "relative", left: "50%" }}>No Results</h1>
          )}
        </Grid>
      </div>
      <div className="counter">
        <button onClick={() => dispatch(decrement())}>-</button>
        <p>{pageRedux}</p>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
    </div>
  );

  const checkData = () => {
    switch (statusRedux) {
      case Status.IDLE:
        return renderSearchPage;
        break;
      case Status.LOADING:
        return <Loader />;
        break;
      case Status.ERROR:
        return <h1>Error</h1>;
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Header />

      {checkData()}
    </>
  );
}

export default SearchResults;
