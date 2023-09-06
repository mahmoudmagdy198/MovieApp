import React, { useEffect, useState } from "react";
import "./MovieDetail.css";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import Header from "./Header";
import { movieID } from "./CardMovie";
import Loader from "./Loader";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  updateDoc,
  setDoc,
  doc,
  getDocs,
  where,
  query,
  getDoc,
  arrayRemove,
} from "firebase/firestore";
import { addFavMoviesId } from "../Redux/features/FavMovieAddSlice";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";

function MovieDetail() {
  const currentAuth = auth.currentUser;
  const dispatch = useDispatch();
  const movie_id = movieID;
  //const favMovies = useSelector((state) => state.favMoviesAdd.favMovies);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const [colorFav, setColorFav] = useState("#fff");
  const [MovieDetail, setMovieDetail] = useState({});
  const [movieTrailer, setMovieTrailer] = useState();

  useEffect(() => {
    getFav();

    getMovieDetails();
    getMovieTrailer();
  }, [movie_id, isLoading]);

  const optionsMovieDetails = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${movie_id}`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmRlY2Q3YTAxNDU1Yjc0NjcwOTFlNDU0MWYzNjUyYSIsInN1YiI6IjY0ZGJjMTdmZjQ5NWVlMDI5NDMxY2Q5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PPCcqagtnwSsQ5xIy2Qp0A9H-s4MLI4eJLWhUZzOJNc",
    },
  };

  const getMovieDetails = async () => {
    setIsLoading(true);
    await axios
      .request(optionsMovieDetails)
      .then(function (response) {
        //console.log(response.data);
        setMovieDetail(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  //////////////////////////////
  const optionsMovieTrailer = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${movie_id}/videos`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmRlY2Q3YTAxNDU1Yjc0NjcwOTFlNDU0MWYzNjUyYSIsInN1YiI6IjY0ZGJjMTdmZjQ5NWVlMDI5NDMxY2Q5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PPCcqagtnwSsQ5xIy2Qp0A9H-s4MLI4eJLWhUZzOJNc",
    },
  };
  const getMovieTrailer = async () => {
    await axios
      .request(optionsMovieTrailer)
      .then(function (response) {
        response.data.results.map((ele) => {
          if (ele.type === "Trailer") {
            setMovieTrailer(ele.key);
          }
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  ////////////////////////////////

  const toggleFavorite = () => {
    if (!isFavorite) {
      dispatch(addFavMoviesId(MovieDetail));
    } else {
      const userRef = doc(db, "Users", `${currentAuth.uid}`);

      // Remove the 'capital' field from the document
      updateDoc(userRef, {
        FavMovies: arrayRemove(MovieDetail),
      });
    }
    setIsFavorite(!isFavorite);
  };

  const getFav = async () => {
    const docRef = doc(db, "Users", `${currentAuth.uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const Arr = docSnap.data().FavMovies
      if(Arr.map(ele => ele.id).includes(MovieDetail.id)){
        setIsFavorite(true)
      }
      else{
        setIsFavorite(false)
      }
      
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const statusRender = () => {
    if (MovieDetail.status === "Released") {
      return <p style={{ color: "green" }}>Released</p>;
    } else {
      return <p style={{ color: "red" }}>Not Released</p>;
    }
  };
  const genreRender = () =>
    MovieDetail.genres?.map((ele) => <p key={ele.id}> {ele.name}</p>);

  const productionCompsRender = () =>
    MovieDetail.production_companies?.map((ele) => (
      <div>
        <p key={ele.id}>{ele.name}</p>
      </div>
    ));
  // gener.map(ele => console.log(`genre ${ele.name}`)
  // )

  const renderDetails = (
    <div className="movieDetails">
      <div className="image_detailMovie">
        <img
          width={"350px"}
          src={`https://image.tmdb.org/t/p/w500/${MovieDetail.poster_path}`}
        ></img>
        <div style={{ cursor: "pointer" }} onClick={() => toggleFavorite()}>
          <FavoriteIcon
            sx={{
              marginLeft: "10px",
              color: `${isFavorite ? "red" : "white"}`,
              fontSize: "2.5rem",
            }}
          />
        </div>
        <div className="details">
          <h1>{MovieDetail.title}</h1>
          <h3>"{MovieDetail.tagline}"</h3>
          <div className="rate_time_date">
            <p>
              Rate: {Math.round(MovieDetail.vote_average * 10) / 10}{" "}
              <StarIcon sx={{ color: "#F8DE22", fontSize: "15px" }} />
            </p>
            <p>Duration: {MovieDetail.runtime} min</p>
            <p>Released: {MovieDetail.release_date}</p>
          </div>
          <div className="genre">
            <h3>Category:</h3>
            {genreRender()}
          </div>
          <div className="lang_production_status">
            <div className="lang_status">
              {statusRender()}
              <p>Language: {MovieDetail.original_language}</p>
            </div>
            <div className="production_comps">
              <h3>Production Companies: </h3>
              {productionCompsRender()}
            </div>
          </div>
        </div>
      </div>
      <div className="plotCast_trailer">
        <div className="plot_cast">
          <h4>Over view: </h4>
          <p>{MovieDetail.overview}</p>
          <h4>Cast: </h4>
        </div>
        <div className="trailer">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${movieTrailer}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      {isLoading ? <Loader /> : renderDetails}
    </>
  );
}

export default MovieDetail;
