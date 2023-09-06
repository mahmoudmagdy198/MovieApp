import React, { useState } from 'react'

function FunctionClick() {

    let user = [
      {
        id:1,
        name:"mahmoud",
        age:23
      },
      {
        id:2,
        name:"ali",
        age:22
      }
    ]
    
    const [car, setCar] = useState({
      brand: "Ford",
      model: "Mustang",
      year: "1968",
      color: "black"
    })
    const [users, setUsers] = useState(user)

    function clickHandler(){
        console.log("clicked");
        console.log(car)
        setCar(previousState =>{
          return{...previousState, color:"blue"}
        })

      
    }

    // const handleChange = index => e => {
    //   setUsers(
    //     users.map(user => {
    //       user.id === index ? {...user, name: e.target.value} : user
    //     })
    //   )
      
    // }
    

    const usersList = users.map((user, index) => (
      <div key={user.id}>
      <input type='text' onChange={(e) => {
        user.name = e.target.value
        setUsers([...users])
      }} name='name' value={user.name} /> 
      <h1>user {user.id} his name is {user.name} and he is {user.age} years old</h1>
      </div>
    ))

    // const carList = (<h1>my car is {car.brand} model {car.model} year {car.year} color {car.color}</h1>) 

    

  return (
    <div>
      
        {/* <h3>{carList}</h3> */}
        <h1>{usersList}</h1>
        <button onClick={clickHandler}>Click</button>
        
    </div>
  )
}

export default FunctionClick