import React, { useState, useEffect } from 'react'
import UserList from './UserList'




function AddingUser({ user, setUser }) {
    
    let [name, setName] = useState("")
    let [age, setAge] = useState(0)
    

     
    const HandleSub = ()=>{
        
        setUser([...user,{
            name:name,
            age: age
        }])
        
        
        
    }
    useEffect(() => {
        console.log(user)
    }, [user])

    const handleName = (userName)=>{
        setName(name = userName)
    }

    const handleAge = (userAge)=>{
        setAge(age = userAge)
    }

  return (
    <div>
        <h1>AddingUser</h1>        
        <span>name </span>
        <input type='text' value = {name} onChange={e => {
            handleName(e.target.value)
            
        }}></input>

        <div>
        <span>age </span>
        <input type='text' value={age} onChange={e => {
            handleAge(e.target.value)
        }}></input>
        </div>
        
        <button onClick={HandleSub}>submit</button>
        
    </div>
  )
}

export default AddingUser