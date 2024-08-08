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
    <div className="movie-info" style={{ position: "relative", overflow: "hidden" }}>
      <div style={backgroundImageStyle}></div>
      <div className="movie-deatil1">
        <img className="movie-poster" src={sample} alt="Movie Poster" />
        <div className="movie-content"></div>
      </div>
      <div className="movie-deatil2">
        <h1>Plot</h1>
        <h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid atque
          sequi ipsam doloribus molestias nostrum assumenda quo illum quaerat
          minus magni aut quos reprehenderit laudantium natus odio pariatur hic,
          voluptatum ab? Quis fugiat omnis, facere quidem consequatur aspernatur
          ipsum dolorem rem non! Quasi, cum. Dignissimos repudiandae iusto cum
          similique modi. Iure quam omnis, cupiditate nesciunt quae veritatis
          molestias rem deleniti consequuntur similique. Laborum hic
          reprehenderit ipsam. Officiis enim magnam similique, voluptatum eum
          pariatur ratione impedit esse soluta animi. Earum sapiente maxime
          dolore atque non aspernatur quis. Ut expedita quidem odit dicta quam,
          necessitatibus, sint ad dignissimos minus sunt ratione debitis?
        </h3>
      </div>
      <div className="trailer-box"></div>
      <div className="castandcrew">
          <div className="cast">
            <h2>Cast</h2>
            <div><span></span><h4>TOM HOLLAND</h4></div>
            <div><span></span><h4>JACK</h4></div>
            <div><span></span><h4>JOHN</h4></div>
            <div><span></span><h4>JESICA</h4></div>
          </div>
          <div className="crew">
            <h2>Crew</h2>
            <div><span>Director</span><h4>TOM HOLLAND</h4></div>
            <div><span>Producer</span><h4>JACK</h4></div>
            <div><span>Writer</span><h4>JOHN</h4></div>
            <div><span>Musician</span><h4>JESICA</h4></div>
          </div>
        </div>
    </div>
  );
};

export default Movieinfo;
