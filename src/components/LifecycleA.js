import React, { Component } from 'react'
import LifecycleB from './LifecycleB'

 class LifecycleA extends Component {
////?? class , function
    constructor(props) {
      super(props)
    
      this.state = {
         name:"mahmoud"
      }
      console.log("constructor A")
    }
    // ?? info
    static getDerivedStateFromProps(props,state){
        console.log(" getDerivedStateFromProps A" + state)

        return null
    }

    componentDidMount(){
        console.log("componentDidMount A")
    }


    /////////
    shouldComponentUpdate(){
        console.log("shouldComponentUpdate A")
        return true
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log("getSnapshotBeforeUpdate A")
        return null
    }

    componentDidUpdate(){
        console.log("componentDidUpdate A")
    }

    changeState= () => {
        this.setState({
            name: "ahmed"
        })
    }

  render() {
    console.log("render A")
    return (

      <div>
        <LifecycleB/>
        <button onClick={this.changeState}>change state</button>
        LifecycleA
        
        </div>
      
    )
  }
}

export default LifecycleA