import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import admin from "../images/icons/profile (2).png";
import Moviecard from "../components/Moviecard";
import { Context } from "..";
import loadingimg from "../images/icons/loading.gif";
import noData from "../images/icons/nodata.gif";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Profile = () => {
  const [activeTab, setActiveTab] = useState("wishlist");
  const [userData, setUserData] = useState(null);
  const { isAuthenticated } = useContext(Context);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (isAuthenticated) {
      fetch(
        "https://d13n7tjnve.execute-api.us-east-1.amazonaws.com/dev/profile",
        {
          method: "GET",
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [isAuthenticated]);

  const renderNoData = () => (
    <div className="no-data">
      <img src={noData} alt="No Data" className="no-data-img" />
      <p>No Movie available</p>
      <br />
      <Link to="/collection" className="link_profile">
        Explore Collection
      </Link>
    </div>
  );

  const handleMovieClick = (movieId) => {
    navigate(`/movieinfo/${movieId}`); // Use movieId here
  };

  if (!userData) {
    return (
      <div className="loading-div">
        <img src={loadingimg} alt="loading" />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img src={admin} alt="Profile" className="profile-img" />
        <div>
          <h2 className="profile-name">{userData.username || "Krishna"}</h2>
          <h3>{userData.email || "Krishna@god.com"}</h3>
          <h3>{userData.phone_number || "N/A"}</h3>
          <div className="genres">
            {userData.genre.map((genre, index) => (
              <span key={index}>{genre}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="toggle-buttons">
        <button
          onClick={() => setActiveTab("wishlist")}
          className={activeTab === "wishlist" ? "active" : ""}
        >
          Saved Movies
        </button>
        <button
          onClick={() => setActiveTab("rented")}
          className={activeTab === "rented" ? "active" : ""}
        >
          Rented Movies
        </button>
        <button
          onClick={() => setActiveTab("recommendations")}
          className={activeTab === "recommendations" ? "active" : ""}
        >
          Recommendations
        </button>
      </div>

      <div className="movies-section">
        {activeTab === "wishlist" && (
          <div className="wishlist">
            {userData.wishlist.length > 0
              ? userData.wishlist
                  .slice() // Create a shallow copy of the array to avoid mutating the original array
                  .reverse() // Reverse the order of the array
                  .map((movie) => (
                    <Moviecard
                      key={movie.movie_id}
                      title={movie.title}
                      genre={movie.genre}
                      poster_url={movie.poster_url}
                      onClick={() => handleMovieClick(movie.movie_id)}
                    />
                  ))
              : renderNoData()}
          </div>
        )}

        {activeTab === "rented" && (
          <div className="rented-movies">
            {userData.current_rented_movies.length > 0
              ? userData.current_rented_movies
                  .slice() // Create a shallow copy of the array to avoid mutating the original array
                  .reverse() // Reverse the order of the array
                  .map((movie) => (
                    <Moviecard
                      key={movie.movie_id}
                      title={movie.title}
                      genre={movie.genre}
                      poster_url={movie.poster_url}
                      onClick={() => handleMovieClick(movie.movie_id)}
                    />
                  ))
              : renderNoData()}
          </div>
        )}

        {activeTab === "recommendations" && (
          <div className="recommendations">
            {userData.recommendations && userData.recommendations.length > 0 ? (
              userData.recommendations.map((movie) => (
                <Moviecard
                  key={movie.movie_id}
                  title={movie.title}
                  genre={movie.genre}
                  poster_url={movie.poster_url}
                  onClick={() => handleMovieClick(movie.movie_id)}
                />
              ))
            ) : (
              <img
                width={100}
                height={100}
                style={{ margin: "auto" }}
                src={loadingimg}
                alt="loading"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
