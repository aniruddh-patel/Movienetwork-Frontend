import React, { useState, useEffect } from "react";
import "./Collection.css";
import Moviecard from "../components/Moviecard";
import noData from "../images/icons/nodata.gif";
import loadingimg from "../images/icons/loading.gif";
import { useNavigate } from "react-router-dom";

const Collection = () => {
  const [activeFilter, setActiveFilter] = useState("All"); 
  const [data, setData] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();


  const fetchMovies = async ({ type, value }) => {
    try {
      setIsLoading(true); 
      const response = await fetch(
        `https://d13n7tjnve.execute-api.us-east-1.amazonaws.com/dev/collection`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type, 
            value, 
          }),
        }
      );
      const result = await response.json();
      setData(result); 
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]); 
    } finally {
      setIsLoading(false); 
    }
  };

  const handleFilterClick = (value, type) => {
    setActiveFilter(value); 
    fetchMovies({ type, value }); 
  };

  useEffect(() => {
    fetchMovies({ type: "genre", value: "All" }); 
  }, []);

  const renderNoData = () => (
    <div className="no-data">
      <img src={noData} alt="No Data" className="no-data-img" />
      <p>No Movie available</p>
    </div>
  );

  const handleMovieClick = (movie_id) => {
    navigate(`/movieinfo/${movie_id}`);
  };

  return (
    <div className="collection-page">
      {/* Sidebar for filters */}
      <div className="sidebar">
        <h4>Filters</h4>
        <ul className="filter-links">
          <li
            className={`filter-item ${
              activeFilter === "top_imdb" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("top_imdb", "top_imdb")}
          >
            <i className="fas fa-star"></i> Top IMDB rating
          </li>
          <li
            className={`filter-item ${
              activeFilter === "top_new_release" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("top_new_release", "top_new_release")}
          >
            <i className="fas fa-film"></i> Top New Release
          </li>
          <li
            className={`filter-item ${
              activeFilter === "most_liked" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("most_liked", "most_liked")}
          >
            <i className="fas fa-thumbs-up"></i> Most Liked
          </li>
          <li
            className={`filter-item ${activeFilter === "free" ? "active" : ""}`}
            onClick={() => handleFilterClick("free", "free")}
          >
            <i className="fas fa-gift"></i> Free for You
          </li>

          <br />
          <ol>
            <i className="fas fa-calendar-alt"></i> Filter by year
          </ol>
          <li
            className={`filter-item ${activeFilter === "2023" ? "active" : ""}`}
            onClick={() => handleFilterClick("2023", "year")}
          >
            ➡️ 2023
          </li>
          <li
            className={`filter-item ${activeFilter === "2022" ? "active" : ""}`}
            onClick={() => handleFilterClick("2022", "year")}
          >
            ➡️ 2022
          </li>
          <li
            className={`filter-item ${activeFilter === "2021" ? "active" : ""}`}
            onClick={() => handleFilterClick("2021", "year")}
          >
            ➡️ 2021
          </li>
          <li
            className={`filter-item ${activeFilter === "2020" ? "active" : ""}`}
            onClick={() => handleFilterClick("2020", "year")}
          >
            ➡️ 2020
          </li>
          <li
            className={`filter-item ${activeFilter === "2019" ? "active" : ""}`}
            onClick={() => handleFilterClick("2019", "year")}
          >
            ➡️ 2019
          </li>
        </ul>
      </div>

      <div className="main-content">
        {/* Genre filter buttons */}
        <div className="genre-filter">
          <button
            className={`genre-button ${activeFilter === "All" ? "active" : ""}`}
            onClick={() => handleFilterClick("All", "genre")}
          >
            All
          </button>
          <button
            className={`genre-button ${
              activeFilter === "Action" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("Action", "genre")}
          >
            Action
          </button>
          <button
            className={`genre-button ${
              activeFilter === "Horror" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("Horror", "genre")}
          >
            Horror
          </button>
          <button
            className={`genre-button ${
              activeFilter === "Mystery" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("Mystery", "genre")}
          >
            Mystery
          </button>
          <button
            className={`genre-button ${
              activeFilter === "Biography" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("Biography", "genre")}
          >
            Biography
          </button>
          <button
            className={`genre-button ${
              activeFilter === "Romantic" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("Romantic", "genre")}
          >
            Romantic
          </button>
          <button
            className={`genre-button ${
              activeFilter === "Comedy" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("Comedy", "genre")}
          >
            Comedy
          </button>
        </div>

        {/* Movies section */}
        <div className="wishlist">
          {isLoading ? (
            <div className="loading-div">
              <img src={loadingimg} alt="loading" />
            </div> // Show loading indicator
          ) : data.length ? (
            data.map((movie) => (
              <Moviecard
                key={movie.movie_id}
                title={movie.title}
                genre={movie.genre}
                poster_url={movie.poster_url}
                onClick={() => handleMovieClick(movie.movie_id)}
              />
            ))
          ) : (
            renderNoData()
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
