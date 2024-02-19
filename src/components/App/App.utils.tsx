import { Movie } from "../../shared/movie.types";

export default function getPartialMovieName(movie: Movie): string {
  const difficulty = 5;
  const indexes = Array.from({ length: movie.name.length }, (_, index) => index)
    .sort((index) =>
      movie.name[index] === " " ? 1 : Math.random() >= 0.5 ? 1 : -1
    )
    .slice(0, Math.max(Math.floor((movie.name.length * difficulty) / 100), 3));

  return movie.name.split("").reduce((name, letter, index) => {
    name = name.concat(indexes.includes(index) ? "_" : letter);

    return name;
  });
}
