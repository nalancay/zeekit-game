import { useEffect, useMemo, useReducer } from "react";
import { Movie } from "../../shared/movie.types";
import getPartialMovieName from "./App.utils";
import confetti from "canvas-confetti";
import { getRandomMovie } from "../../services/movies";

const initialStateApp = {
  points: 0,
  hintsCount: 0,
  showHint: false,
  lives: 3,
  movie: null,
};

export enum APP_ACTION_TYPES {
  SET_POINTS = "SET_POINTS",
  SET_HINTS_COUNT = "SET_HINTS_COUNT",
  SET_SHOW_HINT = "SET_SHOW_HINT",
  SET_LIVES = "SET_LIVES",
  SET_MOVIE = "SET_MOVIE",
  RESET = "RESET",
}

interface State {
  points: number;
  hintsCount: number;
  showHint: boolean;
  lives: number;
  movie: Movie | null;
}

type Action =
  | { type: APP_ACTION_TYPES.SET_POINTS; payload: number }
  | { type: APP_ACTION_TYPES.SET_HINTS_COUNT; payload: number }
  | { type: APP_ACTION_TYPES.SET_SHOW_HINT; payload: boolean }
  | { type: APP_ACTION_TYPES.SET_LIVES; payload: number }
  | { type: APP_ACTION_TYPES.SET_MOVIE; payload: Movie | null }
  | { type: APP_ACTION_TYPES.RESET };

function reducerApp(state: State, action: Action): State {
  switch (action.type) {
    case APP_ACTION_TYPES.SET_POINTS:
      return { ...state, points: state.points + action.payload };
    case APP_ACTION_TYPES.SET_HINTS_COUNT:
      return { ...state, hintsCount: state.hintsCount + action.payload };
    case APP_ACTION_TYPES.SET_SHOW_HINT:
      return { ...state, showHint: action.payload };
    case APP_ACTION_TYPES.SET_LIVES:
      return { ...state, lives: action.payload };
    case APP_ACTION_TYPES.SET_MOVIE:
      return { ...state, movie: action.payload };
    case APP_ACTION_TYPES.RESET:
      return initialStateApp;
    default:
      return state;
  }
}
export const useApp = () => {
  const [state, dispatch] = useReducer(reducerApp, initialStateApp);
  const { points, hintsCount, showHint, lives, movie } = state;

  const partialMovieName = useMemo(() => {
    if (!movie) return "";
    return getPartialMovieName(movie);
  }, [movie]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const guess = formData.get("partial")?.toString();

    if (guess?.toLocaleLowerCase() === movie?.name.toLocaleLowerCase()) {
      alert("Ganaste :)");
      dispatch({ type: APP_ACTION_TYPES.SET_POINTS, payload: 1 });
      confetti({ particleCount: 300, spread: 300 });
    } else {
      alert("Perdiste :(");
      dispatch({ type: APP_ACTION_TYPES.SET_LIVES, payload: lives - 1 });
    }
    dispatch({ type: APP_ACTION_TYPES.SET_MOVIE, payload: null });
    event.currentTarget.partial.value = "";
    dispatch({ type: APP_ACTION_TYPES.SET_SHOW_HINT, payload: false });
  };

  function handleReset() {
    dispatch({ type: APP_ACTION_TYPES.RESET });
  }

  function handleHint() {
    if (!showHint)
      dispatch({ type: APP_ACTION_TYPES.SET_HINTS_COUNT, payload: 1 });
    dispatch({ type: APP_ACTION_TYPES.SET_SHOW_HINT, payload: true });
  }

  useEffect(() => {
    getRandomMovie().then((randomMovie) =>
      dispatch({ type: APP_ACTION_TYPES.SET_MOVIE, payload: randomMovie })
    );
  }, [points, lives]);

  return {
    movie,
    lives,
    points,
    hintsCount,
    showHint,
    handleSubmit,
    partialMovieName,
    handleHint,
    handleReset,
  };
};
