import React from "react";
import Carousel3D from "../components/Carousel3D";
import Slider from "../components/Slider";
const Mainbody = () => {
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
            <h3>Ready to watch? Enter your email to <a href="/">create account</a>.</h3>
            <br />
        <div className="inner-mainbox2">
          <div className="search">
            <input
              type="text"
              placeholder="Search for a Movie..."
            />
            <button>Find</button>
          </div>
        </div>
      </div>

      <div className="parts"><h1>New Release</h1><br /><Slider/></div>
      <div className="parts"><h1>Action</h1><br /><Slider/></div>
      <div className="parts"><h1>Comedy</h1><br /><Slider/></div>
      <div className="parts"><h1>Love side</h1><br /><Slider/></div>
      <div className="parts"><h1>Biography</h1><br /><Slider/></div>
      <div className="parts"><h1>Horror</h1><br /><Slider/></div>
    </div>
  );
};

export default Mainbody;
