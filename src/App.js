import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
import "./App.css";
import HomePage from "./MovieApp/HomePage";
import Test from "./MovieTest/Test";
import Header from "./MovieApp/Header"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
import LoginScreen from "./MovieApp/LoginScreen";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import MovieDetail from "./MovieApp/MovieDetail";
import SearchResults from "./MovieApp/SearchResults";
import Profile from "./MovieApp/Profile";





function App() {

  const navigate = useNavigate();
  useEffect(() => {
   const unsubscribe= onAuthStateChanged(auth , (user) =>{
      if(user){
        
        navigate('/HomePage')
      
      } else{
        navigate('/Login')
      }
    })
    return unsubscribe; 
  }, []);
  

  return (
    <div className="App">
    
        <Routes>
          <Route  path="/HomePage" element={<HomePage />}></Route>
          <Route  path="/Login" element={<LoginScreen />}></Route>
          <Route  path="/Profile" element={<Profile />}></Route>
          <Route  path="/SearchResults" element={<SearchResults/>}></Route>
          <Route  path="/MovieDetail" element={<MovieDetail />}></Route>
        </Routes>
      
    
    </div>
  );
}

export default App;
