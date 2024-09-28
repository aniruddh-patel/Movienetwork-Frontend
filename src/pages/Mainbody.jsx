import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel3D from "../components/Carousel3D";
import Slider from "../components/Slider";
import { toast } from "react-toastify";

const Mainbody = () => {
  const [movies, setMovies] = useState({
    actionMovies: [],
    comedyMovies: [],
    loveMovies: [],
    biographyMovies: [],
    horrorMovies: [],
    mysteryMovies: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://d13n7tjnve.execute-api.us-east-1.amazonaws.com/dev/moviedata"
    )
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movie data:", error));
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      fetch(
        `https://d13n7tjnve.execute-api.us-east-1.amazonaws.com/dev/searchmovie?title=${encodeURIComponent(
          searchTerm
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.movie_id) {
            navigate(`/movieinfo/${data.movie_id}`);
          } else {
            toast.error("Movie not found!");
          }
        })
        .catch((error) =>
          console.error("Error fetching search results:", error)
        );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mainbody">
      <div className="part1">
        <br />
        <Carousel3D />
        <h5>⦾⦾⦿⦾⦾</h5>
        <h1>Unlimited movies and much more</h1>
        <br />
        <p>Watch anywhere. Pay what you watch😀.</p>
        <br />
        <h3>
          Ready to watch? Enter your email to{" "}
          <Link to="/signup">create account</Link>.
        </h3>
        <br />
        <div className="inner-mainbox2">
          <div className="search">
            <input
              type="text"
              placeholder="Search for a Movie..."
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <button onClick={handleSearch}>Find</button>
          </div>
        </div>
      </div>

      {/* <div className="parts">
        <h1>New Release</h1>
        <Slider movies={movies.actionMovies} startDelay={2300} />
        <br />
      </div> */}
      <div className="parts">
        <h1>
          <i className="fas fa-fist-raised"></i> Action
        </h1>
        <Slider movies={movies.actionMovies} startDelay={1600} />
        <br />
      </div><br />
      <div className="parts">
        <h1>
          <i className="fas fa-laugh-squint"></i> Comedy
        </h1>
        <Slider movies={movies.comedyMovies} startDelay={2300} />
        <br />
      </div><br />
      <div className="parts">
        <h1>
          <i className="fas fa-heart"></i> Love
        </h1>
        <Slider movies={movies.loveMovies} startDelay={4200} />
        <br />
      </div><br />
      <div className="parts">
        <h1>
          <i className="fas fa-user"></i> Biography
        </h1>
        <Slider movies={movies.biographyMovies} startDelay={300} />
        <br />
      </div><br />
      <div className="parts">
        <h1>
          <i className="fas fa-ghost"></i> Horror
        </h1>
        <Slider movies={movies.horrorMovies} startDelay={1500} />
        <br />
      </div><br />
      <div className="parts">
        <h1>
          <i className="fas fa-question-circle"></i> Mystery
        </h1>
        <Slider movies={movies.mysteryMovies} startDelay={2300} />
        <br />
      </div><br />
    </div>
  );
};

export default Mainbody;
