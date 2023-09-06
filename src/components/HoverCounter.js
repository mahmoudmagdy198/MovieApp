import React, { Component } from "react";
import UpdatedComponent from "./wihCounter";

class HoverCounter extends Component {
    
  render() {
    const {count , incremenCount} = this.props
    return( 
        <div>

        <h2 onMouseOver={incremenCount}>
            Hovered {count} times</h2>
        

        </div>
    )
  }
}

export default UpdatedComponent(HoverCounter);
