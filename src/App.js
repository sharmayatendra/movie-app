import React, { useEffect, useState } from 'react';
// import './App.css';
import Movie from './components/Movie';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(FEATURED_API)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setMovies(data.results);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(SEARCH_API+searchTerm)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setMovies(data.results);
    });
    setSearchTerm('');

  }

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  }


  return (
    <>
  <header>
    <form onSubmit={handleSubmit}>
      <h1>Movie-Maniac🎬</h1>
    <input className="search" type="search" placeholder="search" value={searchTerm} onChange={handleChange}/>
    </form>
  
  </header>

  <div className="movie__container"> 
    
    {movies.length > 0 && movies.map((movie) => 
      <Movie key={movie.id} {...movie}/>
    )}
  </div>
  </>
  )
}

export default App;
