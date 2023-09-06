import React, { Component } from "react";
import axios from "axios";


class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      error: '',
      
    };
  }

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        console.log(response);
        this.setState({ posts: response.data });
      })
      .catch(
        (error) => {console.log(error)
        this.setState({error:'error happend'});
        }
      );
  }

  

  render() {
    const { posts , error} = this.state;
    const postUi = posts.map((post) => {
      return <div style={{background:'gray',fontSize:30,fontWeight:10}} key={post.id}>{post.title}</div>;
    });
    console.log(postUi.length)
    const errorUi = () =>{
        return <div style={{color:'red', fontFamily:100,fontSize:50,fontStyle:'bold'}}>{error}</div>
    }
    const loading = () =>{
        return <div>loading...</div>
    }
   
    return (
      <div>
        <h1>Post List</h1>
        {
            postUi.length !== 0 ? postUi : loading()
          //posts.map(post => <div key={post.id}>{post.title}</div>)
        }
      </div>
    );
  }
}

export default PostList;
