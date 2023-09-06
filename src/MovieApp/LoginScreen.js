import React, { useRef } from "react";
import './LoginScreen.css';
import {auth} from "../firebase";
import {createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

function LoginScreen() {
    
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSignUp = async () =>{
        if (passwordRef.current.value !== "" && (passwordRef.current.value).length >= 8) {
            createUserWithEmailAndPassword(auth,emailRef.current.value,passwordRef.current.value)
        .then(userCredential =>{
            const user = userCredential.user
             setDoc(doc(db, "Users", `${user.uid}`), {
                FavMovies:[],
                email: user.email,
                uID: user.uid
              }); 
            
        })
        .catch(error => {
            console.log(error.message);
            alert(error.message);
        })
        }
        else{
            alert("password must be more than or equal 8 characters");
        }
          
    }

    const handleSignIn = () =>{
        console.log("signIn");
        signInWithEmailAndPassword(auth,emailRef.current.value,passwordRef.current.value)
        .then(userCredential =>{
            const user = userCredential.user
            console.log(user);
            
        })
        .catch(error => {
            console.log(error.message);
            alert("you may entered wrong email or password")
            
        })
    }


  return (
    <div className="loginScreen">
      <div className="loginScreen_background">
        <div className="loginScreen_gradient"/>

      </div>
      <div className="loginScreen_body">
            <>
            <h1>Movies</h1>
                <h2>Sign In / Sign Up</h2>
                <div className="loginScreen_input">
                    <form>
                         <div>
                         <input ref={emailRef} type="email" placeholder="Email Address"/>
                         </div>
                         <div>
                         <input ref={passwordRef} type="password" placeholder="Password"/>
                         </div>
                         <div>
                            <button onClick={(e)=>{handleSignIn(); e.preventDefault() }} type="submit">Log In</button>
                         </div>
                         <div>
                            <button onClick={(e)=> {handleSignUp(); e.preventDefault()}} type="submit">Sign Up</button>
                         </div>


                    </form>
                </div>
            </>
      </div>
    </div>);
}

export default LoginScreen;
