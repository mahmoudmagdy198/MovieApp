import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./HomePage.css";
//http://www.omdbapi.com/?i=tt3896198&apikey=8e66a947
function HomePage() {
    
  const [movie, setMovie] = useState({});
  const [movieTitle, setMovieTitle] = useState("");

  const inputRef = useRef(null)

  const getDataByID = () => {
    axios
      .get("http://www.omdbapi.com/?i=tt3896198&apikey=8e66a947")
      .then((response) => {
        console.log(response.data);
        setMovie(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getDataByName = (movieTitle) => {
    axios
      .get(`http://www.omdbapi.com/?t=${movieTitle}&apikey=8e66a947`)
      .then((response) => {
        console.log(response.data);
        setMovie(response.data);
      })
      .catch((error) => {
        console.error("error:: " + error);
      });
  };

  useEffect(() => {
    inputRef.current.focus()

  }, []);
  
  
  useEffect(() => {
    getDataByName(movieTitle);
    // getDataByID()
    // console.log(getDataByID());
  }, [movieTitle]);

  const handleSearch = () => {
    setMovieTitle(inputRef.current.value)
  };

  const check = () => {
    if (movieTitle.length <= 0) {
      return <div className="msgNoName"> Enter the movie Name!</div>;
    } else if (movie.Response === "True") {
      return (
        <div className="info">
          <img className="poster" src={movie.Poster}></img>
          <div>
            <h2>
              {movie.Title} - "{movie.Type}"
            </h2>

            <div className="rating">
              <h4>imdbRating: {movie.imdbRating}</h4>
            </div>
            <div className="details">
              <span>{movie.Rated}</span>
              <span>{movie.Year}</span>
              <span>{movie.Runrime}</span>
            </div>
            <div className="genre">{movie.Genre}</div>
          </div>
          <h3>Plot:</h3>
          <p>{movie.Plot}</p>
          <h3>Cast:</h3>
          <p>{movie.Actors}</p>
        </div>
      );
    } else return <div className="msgNoName">Not a correct Name</div>;
  };

  return (
    <div className="homePage">
      <div className="input_buttonSearch">
        <input
          className="searchBar"
          type="text"
          ref={inputRef}
        //   value={movieTitle}
        //   onChange={(e) => setMovieTitle(e.target.value)}
        ></input>
        <button className="buttonSearch" onClick={() => handleSearch()}>
          Search
        </button>
      </div>
      {check()}
    </div>
  );
}

export default HomePage;
