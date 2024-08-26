import React from "react";
import "./Movieinfo.css";
import sample from "../images/sampleposter.jpeg";

const Movieinfo = () => {
  const backgroundImageStyle = {
    background: `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url(${sample})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(10px)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  };

  return (
    <div
      className="movie-info"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div style={backgroundImageStyle}></div>
      <div className="movie-deatil1">
        <img className="movie-poster" src={sample} alt="Movie Poster" />
        <div className="movie-content">
          <h1 className="heading">Title: <span>Venom the Carnage</span></h1><br />
          <h3 className="company">Company: <span>Sony Picture</span></h3>
          <h3 className="company">Director: <span>John harward</span> </h3>
          <div className="genres">
            <span>Action</span>
            <span>Science-Fiction</span>
          </div>
          <h2>⭐⭐⭐⭐⭐</h2>

          <h3 className="price">Price: <span>$4.99</span></h3><h3 className="year">Year: <span>2018</span> </h3>
          <h2 className="imdb">IMDB: <span>8.6</span></h2><h3 className="Likes">Likes: <span>1200</span></h3>
          <div className="button-Group">
            <button className="rentbutton">Buy a Rent</button>
            <button className="savebutton">Add to Wishlist</button>
            <button className="likebutton">⭐</button>
          </div>
        </div>
      </div>
      <div className="movie-deatil2">
        <h1>Plot</h1>
        <h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, totam? Accusamus dignissimos, voluptate corrupti rerum perferendis nostrum ut atque laudantium! Quisquam voluptatum nulla quia impedit inventore dolorem animi facere adipisci omnis! Dignissimos officia reiciendis quibusdam odit voluptas a, fugit molestias. Sed, dicta voluptatibus ut expedita aperiam beatae facilis quis dolor facere nisi nulla molestias assumenda vitae tempora cupiditate iste illo obcaecati architecto repudiandae magnam excepturi soluta inventore voluptates. A obcaecati architecto maiores aut eum tenetur cumque doloribus quibusdam quos, voluptatum earum tempora voluptas, iusto, dolor voluptatibus atque dolorem facere similique omnis reiciendis qui ea neque. Odit illo sunt totam quidem. ipsum dolor sit amet consectetur adipisicing elit. Ea, enim adipisci odit quod itaque iusto quia nihil ut eum sint deleniti asperiores quaerat sequi, harum provident veniam in modi, id similique sit rerum maxime? Eligendi non corporis placeat fuga est.
        </h3>
      </div>
      <div className="trailer-box"></div>
      <div className="castandcrew">
        <div className="cast">
          <h2>Cast</h2>
          <div>
            <h1>🙋</h1>
            <h4>TOM HOLLAND</h4>
          </div>
          <div>
          <h1>💁‍♂️</h1>
            <h4>JACK</h4>
          </div>
          <div>
          <h1>🙋‍♂️</h1>
            <h4>JOHN</h4>
          </div>
          <div>
          <h1>🤷🏻‍♀️</h1>
            <h4>JESICA</h4>
          </div>
        </div>
        <div className="crew">
          <h2>Crew</h2>
          <div>
            <span>Director</span>
            <h4>TOM HOLLAND</h4>
          </div>
          <div>
            <span>Producer</span>
            <h4>JACK</h4>
          </div>
          <div>
            <span>Writer</span>
            <h4>JOHN</h4>
          </div>
          <div>
            <span>Musician</span>
            <h4>JESICA</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movieinfo;
