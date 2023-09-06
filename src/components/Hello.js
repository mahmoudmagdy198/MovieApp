import React from "react";

const Hello = (user) =>{
    console.log(user);
    const {name , age} = user;
    
    return(
        <div>
            
            <h1>Hello {name}{parseInt(age) + 1}</h1>
        </div>
    )
}
export default Hello