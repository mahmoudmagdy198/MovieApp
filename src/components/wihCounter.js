import React from "react";

const UpdatedComponent = OriginalComponent =>{
    class NewComponent extends React.Component{

        constructor(props) {
            super(props)
          
            this.state = {
               count: 0
            }
          }
      
        incremenCount = () =>{
          this.setState(prevState => {
              return {count : prevState.count + 1}
          })
        }

        render(){
            return (
            <OriginalComponent
             count = {this.state.count} 
             incremenCount = {this.incremenCount}/>
            )
        }
    }
    return NewComponent
}

export default UpdatedComponent

/*
const Updatedfun = OriginalComp => {
    class NewComp extends React.component{
        render(){
            return(
                <OriginalComp  props/>
            )
        }
    }
    return NewComp
}


*/