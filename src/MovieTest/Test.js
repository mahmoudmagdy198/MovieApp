import React, { useState } from "react";
import axios from 'axios';

function Test() {
    const [name,setName] = useState("")
// curl --request GET \
//  --url 'https://api.themoviedb.org/3/discover/
//movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc' \


const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmRlY2Q3YTAxNDU1Yjc0NjcwOTFlNDU0MWYzNjUyYSIsInN1YiI6IjY0ZGJjMTdmZjQ5NWVlMDI5NDMxY2Q5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PPCcqagtnwSsQ5xIy2Qp0A9H-s4MLI4eJLWhUZzOJNc'
  }
};

axios
  .request(options)
  .then((response) => {
    console.log(response.data.results[0].original_title);
     setName(response.data.results[0].original_title);
  })
  .catch((error) => {
    console.error(error);
  });

  return (<>
  <h1>Test</h1>
  <div>{name}</div>
  </>
  )
}

export default Test;
