import React from "react";
import Auth from "./components/Auth";
import AddMovies from "./components/AddMovies";
import MovieList from "./components/MovieList";

const App = () => {
  return (
    <div className="App">
      <Auth />
      <AddMovies />
      <MovieList />
    </div>
  );
};

export default App;
