// src/App.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './MovieFilter.css';

const API_KEY = "your api here ";

function App() {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');

  useEffect(() => {
    // Fetch movie genres
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${API_KEY}`)
      .then((response) => {
        setGenres(response.data.genres);
      })
      .catch((error) => {
        console.error('Error fetching genres:', error);
      });

    // Fetch popular movies
    axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${API_KEY}`)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = selectedGenre === 'All' ? movies : movies.filter((movie) => movie.genre_ids.includes(selectedGenre));

  return (
    <div className="App">
      <div className="title-row">
        <h1>Popular Movies by Genre</h1>
      </div>

      <div className="movie-container">
        <div className="genre-list">
          <h2>Genres:</h2>
          <ul>
            <li
              key="All"
              onClick={() => handleGenreClick('All')}
              className={selectedGenre === 'All' ? 'selected' : ''}
            >
              All
            </li>
            {genres.map((genre) => (
              <li
                key={genre.id}
                onClick={() => handleGenreClick(genre.id)}
                className={selectedGenre === genre.id ? 'selected' : ''}
              >
                {genre.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="movie-list">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={`Poster for ${movie.title}`}
              />
              <h3>{movie.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
