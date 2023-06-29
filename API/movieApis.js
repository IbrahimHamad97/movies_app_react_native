import axios from "axios";
const apiKey = "707414e69b0a5e6234ef7f10d3320a1e";

const baseUrl = "https://api.themoviedb.org/3/";
const trendingMoviesUrl = baseUrl + "trending/movie/day?api_key=" + apiKey;
const upcomingMoviesUrl = baseUrl + "movie/upcoming?api_key=" + apiKey;
const topRatedMoviesUrl = baseUrl + "movie/top_rated?api_key=" + apiKey;

export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";
export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";

export const img500 = (path) =>
  path ? "https://image.tmdb.org/t/p/w500" + path : null;
export const img342 = (path) =>
  path ? "https://image.tmdb.org/t/p/w342" + path : null;
export const img185 = (path) =>
  path ? "https://image.tmdb.org/t/p/w185" + path : null;

const apiCall = async (url, body) => {
  const options = {
    method: "GET",
    url: url,
    data: body ? body : {},
  };

  try {
    const res = await axios.request(options);
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getMovieDetails = (movieId) => {
  const movieDetails = baseUrl + `movie/${movieId}?api_key=${apiKey}`;
  return apiCall(movieDetails);
};

export const getCredits = (movieId) => {
  const movieDetails = baseUrl + `movie/${movieId}/credits?api_key=${apiKey}`;
  return apiCall(movieDetails);
};

export const getSimilar = (movieId) => {
  const movieDetails = baseUrl + `movie/${movieId}/similar?api_key=${apiKey}`;
  return apiCall(movieDetails);
};

export const getActor = (actorId) => {
  const movieDetails = baseUrl + `person/${actorId}?api_key=${apiKey}`;
  return apiCall(movieDetails);
};

export const getActorMovies = (actorId) => {
  const movieDetails =
    baseUrl + `person/${actorId}/movie_credits?api_key=${apiKey}`;
  return apiCall(movieDetails);
};

export const searchMovies = (query) => {
  const movieDetails =
    baseUrl +
    `search/movie?query=${query}&include_adult=fals&api_key=${apiKey}`;
  return apiCall(movieDetails);
};

export const getTrending = () => {
  return apiCall(trendingMoviesUrl);
};

export const getUpcoming = () => {
  return apiCall(upcomingMoviesUrl);
};

export const getTopRated = () => {
  return apiCall(topRatedMoviesUrl);
};
