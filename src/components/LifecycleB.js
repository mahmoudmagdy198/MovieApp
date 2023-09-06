import React, { Component } from 'react'

class LifecycleB extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         name: "mahmoud"
      }
      console.log("constructor B")
    }
    static getDrivedStateFromProps(props,state){
        console.log("getDrivedStateFromProps B")
        return null
    }

    componentDidMount(){
        console.log("componentDidMount B")
    }

    ////////
    shouldComponentUpdate(){
        console.log("shouldComponentUpdate B")
        return true
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log("getSnapshotBeforeUpdate B")
        return null
    }

    componentDidUpdate(){
        console.log("componentDidUpdate B")
    }
  render() {
    console.log("render B")
    return (
      <div>LifecycleB</div>
    )
  }
}

export default LifecycleB