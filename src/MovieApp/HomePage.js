import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import Header from "./Header";
import "./HomePage.css";
import Loader from "./Loader";
import CardMovie from "./CardMovie";
import { Container, Grid ,Box} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {getPopularMovies,getTopRatedMovies} from '../Redux/features/movieSlice'
import Status from "../Utilits/Status";



function HomePage() {
  const status = useSelector((state) => state.movie.status)
  const popularMovies = useSelector((state) => state.movie.popularMovies)
  const topRatedMovies = useSelector((state) => state.movie.topRatedMovies)
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getPopularMovies())
    dispatch(getTopRatedMovies())
  }, []);
 
  const renderHomaPage = ( 
  <div className="homePage">
  <Header />
  <div className="popularMovie">
    <h1>Popular Movies</h1>
    <div className="cards">
      
      <Grid container direction={'row'} spacing={1} justifyContent={'flex'}>
      {popularMovies?.map((ele) =>(
        <Grid item sm={1.5}>
          <CardMovie key={ele.id} movie={ele}/> 
        </Grid>
        ))}
      </Grid>
      
    </div>
  </div>

  <div className="topRaterMovie">
    <h1>Top Rater Movies</h1>
    <div className="cards">
      
      <Grid container direction={'row'} spacing={1} justifyContent={'flex'}>
      {topRatedMovies?.map((ele) =>(
        <Grid item sm={1.5}>
          <CardMovie key={ele.id} movie={ele}/> 
        </Grid>
        ))}
      </Grid>
      
    </div>
  </div>
</div>

)
  
  return (
    <>
    {status !== Status.IDLE ? <Loader/> : renderHomaPage}
    </>
   
  );
}

export default HomePage;
