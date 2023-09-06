import React from "react";
import "./CardMovie.css";
import StarIcon from '@mui/icons-material/Star';

import { Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export let movieID
function CardMovie(props) {
  
    const {movie} = props 
    
    const navigate = useNavigate();

    const detailsMovie = (movieClicked) => {
      console.log(`clicked: ${movieClicked.title}`);
       movieID = movie.id
      navigate('/MovieDetail')
      
    }
  
   //console.log(movie.poster_pat);
    
  return (
      
    <Grid item >
        <div className="card" onClick={() => detailsMovie(movie)}>
      <div className="content">
        <div className="back">
          <div className="back-content" style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,backgroundPosition: 'center' ,backgroundSize:'cover'}}>
            
          </div>
        </div>
        <div className="front">
          <div className="img" style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,backgroundPosition: 'center' ,backgroundSize:'cover'}}>
            
            
          </div>
          <div className="front-content">
            <div className="rating-container">
            <small className="badge">{Math.round(movie.vote_average * 10) / 10}
            </small>
            <StarIcon sx={{ color: '#F8DE22', fontSize:'0.95rem'}}/>
            </div>
            
            <small className="releaseBadge">{movie.release_date}</small>
            <div className="description">
              <div className="title">
                <p className="title">
                  <strong>{movie.title}</strong>
                </p>
                <svg
                  fillRule="nonzero"
                  height="15px"
                  width="15px"
                  viewBox="0,0,256,256"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    style={{ mixBlendMode: "normal" }}
                    textAnchor="none"
                    fontSize="none"
                    fontWeight="none"
                    fontFamily="none"
                    strokeDashoffset={0}
                    
                    strokeMiterlimit={10}
                    strokeLinejoin="miter"
                    strokeLinecap="butt"
                    strokeWidth={1}
                    stroke="none"
                    fillRule="nonzero"
                    fill="#20c997"
                  >
                    <g transform="scale(8,8)">
                      <path d="M25,27l-9,-6.75l-9,6.75v-23h18z" />
                    </g>
                  </g>
                </svg>
              </div>
              
              <p className="card-footer"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </Grid>
    
  );
}


export default CardMovie;
