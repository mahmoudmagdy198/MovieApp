import React, { useEffect, useState } from 'react'
import './Header.css'

export default function Header() {

  let [count , setCount] = useState(0);
  const [color,setColor] = useState("white");

  

  useEffect(() =>{
    setTimeout(() => {
      setCount((count+=1));
    }, 1000);
  }, []);


  
  let changeColor = () =>{
    if (color === "white"){
      setColor("gray");
    }else
      setColor("white");
  }

  let resetTime = function(){
      setCount(count = 0);
  }
  
  return (
    <div className='header'>
      
          <div className="header_left" style={{backgroundColor:`${color}`}}>
          
            <button type="button" autoFocus={false} onClick={()=>changeColor()}>changeColor</button>
            <button type="button" autoFocus={false} onClick={()=>resetTime()}>resetTime</button>

            <div className="header_search">
                <span>{count}</span>
                
            </div>
        </div>

        <div className="header_right">

        </div>
    </div>
  )
}
