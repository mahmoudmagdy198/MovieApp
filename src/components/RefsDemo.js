import React, { Component } from 'react'

class RefsDemo extends Component {

    constructor(props) {
      super(props)
      this.inputRef = React.createRef()

    }
    componentDidMount(){
        this.inputRef.current.focus()
        console.log(this.inputRef.current)
    }

    clickHandler = () =>{
        console.log(this.inputRef.current.value)
    }

  render() {
    return (
      <div>RefsDemo
        <input type='text' ref={this.inputRef}/>
        <button onClick={this.clickHandler}>click</button>
      </div>
    )
  }
}

export default RefsDemo