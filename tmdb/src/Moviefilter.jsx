// src/components/MovieFilter.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./MovieFilter.css"

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300'; // Adjust the image size as needed

function MovieFilter({ movies, genres }) {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [filteredMovies, setFilteredMovies] = useState(movies); // Initialize with all movies

  const handleGenreClick = (genreId) => {
    if (genreId === selectedGenre) {
      // If the same genre is clicked again, reset the filter to show all movies
      setSelectedGenre('All');
      setFilteredMovies(movies);
    } else {
      // Filter movies by genre
      setSelectedGenre(genreId);
      const filtered = genreId === 'All' ? movies : movies.filter((movie) => movie.genre_ids.includes(parseInt(genreId)));
      setFilteredMovies(filtered);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="genreSelect">Filter by Genre:</label>
        <select id="genreSelect" onChange={(e) => handleGenreClick(e.target.value)} value={selectedGenre}>
          <option value="All">All</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className="movie-list">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
              alt={`Poster for ${movie.title}`}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieFilter;
