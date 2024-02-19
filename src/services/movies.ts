import { Movie } from "../shared/movie.types";

const URL = "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1";

export async function getRandomMovie(): Promise<Movie> {
  return fetch(URL, {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` },
  })
    .then((res) => res.json() as Promise<{ results: Movie[] }>)
    .then(
      ({ results: movies }) => movies[Math.floor(Math.random() * movies.length)]
    );
}
