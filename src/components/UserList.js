import React from 'react'
import User from './User'

export default function UserList({user}) {
    // let user = [
    //     {
    //       id:1,
    //       name:"mahmoud",
    //       age:23
    //     },
    //     {
    //       id:2,
    //       name:"ali",
    //       age:22
    //     }
    //   ]
    
    

     

    console.log(`child ${user}`)
  //  let userList = user.map((ele)=>(<User key={ele.id} per={ele}></User>))  
  return (
    <div>
      <h1>UsersList</h1>
      {/* {userList} */}
      {user.length >= 1 &&  
        user.map((singleUser, index) => (
          <span key={index}> {`My name is ${singleUser.name}, and Im ${singleUser.age} years old`} </span>
        ))
      
      }
    </div>
  )
}
