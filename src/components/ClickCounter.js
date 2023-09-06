import React, { Component } from "react";
import UpdatedComponent from "./wihCounter";

class ClickCounter extends Component {

    
  render() {
    const {count , incremenCount} = this.props
    return <button onClick={incremenCount}>
        Clicked {count} times</button>;
  }
}

export default UpdatedComponent(ClickCounter);
