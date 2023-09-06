import axios from "axios";

export const searchMovieAPI = async (titleRedux,pageRedux) =>{
    const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/search/movie",
        params: {
          query: `${titleRedux}`,
          include_adult: "false",
          language: "en-US",
          page: `${pageRedux}`,
        },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmRlY2Q3YTAxNDU1Yjc0NjcwOTFlNDU0MWYzNjUyYSIsInN1YiI6IjY0ZGJjMTdmZjQ5NWVlMDI5NDMxY2Q5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PPCcqagtnwSsQ5xIy2Qp0A9H-s4MLI4eJLWhUZzOJNc",
        },
      };
      const response = await axios.request(options);
      return response.data.results;
}