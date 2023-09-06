import { auth } from "../firebase";
import Header from "./Header";
import { useEffect, useState } from "react";
import "./Profile.css";
import CardMovie from "./CardMovie";
import { Container, Grid ,Box} from "@mui/material";
import { db } from "../firebase";
import { collection, addDoc,getDoc, getDocs,setDoc, doc,onSnapshot} from "firebase/firestore";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";

function Profile() {
  const currentAuth = auth.currentUser;
  const dispatch = useDispatch();
  const [favMovies,setFavMovies] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const moviesFav = useSelector((state) => state.favMoviesAdd.favMovies)

  useEffect(() => {
    getFav()
  }, [currentAuth]);

  const getFav = async () => {
    setIsLoading(true)
    const docRef = doc(db, "Users", `${currentAuth?.uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setFavMovies(docSnap.data().FavMovies)
      setIsLoading(false)
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  
  //<h2 style={{position:"relative",left:"50%",top:"5%"}}>No Favorites</h2>
  return (
    <>
      <Header />
      <div className="ProfilePage"> welcome {currentAuth?.email}</div>
      <h1 style={{position:"relative",top:"100px",left:"50%"}}>Your Favorites</h1>
      <div style={{position:"relative", top:"100px"}}>
        <div className="cards">
      
      <Grid container direction={'row'} spacing={1} justifyContent={'flex'}>
      {isLoading === true ? <Loader/> : favMovies.length !== 0 ? favMovies?.map((ele) =>(
        <Grid item sm={1.5}>
          <CardMovie key={ele.id} movie={ele}/> 
        </Grid>
        )) : <h2 style={{position:"relative",left:"50%",top:"5%"}}>No Favorites</h2>}
      </Grid>
      
    </div>
        </div>
    </>
  );
}

export default Profile;
