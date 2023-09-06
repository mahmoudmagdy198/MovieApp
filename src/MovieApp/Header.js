import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { increment,decrement,reset,changeName,getSearchedMovies } from "../Redux/features/SearchMovieSlice";


function Header() {

 // const nameRedux = useSelector((state) => state.movie.name)
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const inputRef = useRef(null);
  const backHome = () => {
    navigate("/HomePage");
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/Login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

 const handleSearch = () =>{
    dispatch(reset(1))
    if(inputRef.current.value !== ""){
      dispatch(changeName(inputRef.current.value))
      navigate("/SearchResults")
    }
    
  }

  const handleProfile = () =>{
    navigate("/Profile")
  }
  
  return (
    <div className="header">
      <h1 className="movieApp" onClick={() => backHome()}>
        Movie App
      </h1>
      <div className="searchBox">
        <input className="searchInput" type="text" ref={inputRef} name="" placeholder="Search..." />
        <button className="searchButton" href="#"  onClick={()=>handleSearch()}>
          <i className="material-icons">search</i>
        </button>
      </div>
      <button className="profileButton" onClick={() => handleProfile()}>Profile</button>
      <button onClick={() => handleSignOut()}>SignOut</button>
    </div>
  );
}

export default Header;
