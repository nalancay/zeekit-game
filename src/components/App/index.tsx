import React from "react";
import "./App.css";
import { useApp } from "./useApp";

export default function App() {
  const {
    movie,
    lives,
    points,
    hintsCount,
    handleSubmit,
    partialMovieName,
    handleHint,
    showHint,
    handleReset,
  } = useApp();

  return (
    <main className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] px-4 bg-green-200">
      <header className="text-xl font-bold leading-[3rem]">Zeekit Game</header>
      <section>
        {!movie ? (
          <div>Loading...</div>
        ) : lives ? (
          <>
            <div className="text-center text-xl">
              Lives: {lives} - Points: {points} - Hints: {hintsCount}
            </div>
            <form
              onSubmit={handleSubmit}
              className="py-8 font-mono flex flex-col gap-4"
            >
              <input
                className="p-4 text-xl tracking-wider"
                type="text"
                readOnly
                value={partialMovieName}
              />
              <input
                autoComplete="off"
                autoFocus
                className="p-4 text-xl tracking-wider"
                name="partial"
                type="text"
              />
              <button type="button" onClick={handleHint}>
                Show hint
              </button>
              <button type="submit">Guess</button>
              {showHint && <p>{movie.overview}</p>}
            </form>
          </>
        ) : (
          <div className="text-center p-4 grid gap-4">
            <p className="text-xl"> Game Over</p>
            <button onClick={handleReset}> Play again</button>
          </div>
        )}
      </section>
      <footer className="text-center leading-[3rem] opacity-70">
        © {new Date().getFullYear()} Natalia Alancay
      </footer>
    </main>
  );
}
