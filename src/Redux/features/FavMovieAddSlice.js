import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Status from "../../Utilits/Status";
import { auth } from "../../firebase";
import { doc, updateDoc,arrayUnion ,onSnapshot} from "firebase/firestore";
import { db } from "../../firebase";

const initialState = {
    favMovies: [],
};

export const favMoviesSlice = createSlice({
  name: "favMovies",
  initialState,
  reducers: {
    addFavMoviesId(state,action){
      const currentAuth = auth.currentUser
    if (!state.favMovies.id?.includes(action.payload.id)) {
      state.favMovies?.push(action.payload)
      const userRef = doc(db, "Users", `${currentAuth.uid}`);
       updateDoc(userRef, {
      FavMovies: arrayUnion(action.payload)
    });
    } 
    },
    getFavMovies(state,action){
      const currentAuth = auth.currentUser
      onSnapshot(doc(db, "Users", `${currentAuth.uid}`), (doc) => {
        console.log("Current data: ", doc.data().FavMovies);
        state.favMovies = doc.data().FavMovies;
    });
    },
    resetMovies(state){
      state.favMovies = [];
    }
  },
});


export const {addFavMoviesId,resetMovies ,getFavMovies} =
  favMoviesSlice.actions;
export default favMoviesSlice.reducer;
