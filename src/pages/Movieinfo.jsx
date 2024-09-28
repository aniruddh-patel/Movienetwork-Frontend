import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Movieinfo.css";
import empty from "../images/icons/emptystar.png";
import star from "../images/icons/star.png";
import loadingimg from "../images/icons/loading.gif";
import { toast } from "react-toastify";
import { Context } from "..";

const Movieinfo = () => {
  const { movie_id } = useParams();
  const [movie, setMovie] = useState(null);
  const [likes, setLikes] = useState(0);
  const [presignedUrl, setPresignedUrl] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(Context);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateLikes = () => {
    setLikes((prevLikes) => prevLikes + 1);

    fetch(
      `https://d13n7tjnve.execute-api.us-east-1.amazonaws.com/dev/movies/${movie_id}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLikes(data.likes);
      })
      .catch((error) => {
        console.error("Error updating likes:", error);
        setLikes((prevLikes) => prevLikes - 1);
      });
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://d13n7tjnve.execute-api.us-east-1.amazonaws.com/dev/movies/${movie_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setMovie(data);
          setLikes(data.likes);
          if (data.presigned_url) {
            setPresignedUrl(data.presigned_url);
          }
        } else {
          console.error("Failed to fetch movie info");
        }
      } catch (error) {
        console.error("Error fetching movie info:", error);
      }
    };

    fetchMovie();
  }, [movie_id]);

  if (!movie)
    return (
      <div className="loading-div">
        <img src={loadingimg} alt="loading" />
      </div>
    );

  const backgroundImageStyle = {
    backgroundRepeat: "no-repeat",
    width: "100vw",
    background: "linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60))",
    backgroundPosition: "center",
    filter: "blur(10px)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  };

  const extractVideoId = (url) => {
    const url_id =
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:embed\/|watch\?v=|v\/|.+\?v=)?([^"&?\/\s]{11})/;
    const match = url.match(url_id);
    return match ? match[1] : "";
  };

  const renderStars = (rating) => {
    const stars = Math.round(rating / 2);
    const filledStars = Array(stars).fill(
      <img
        src={star}
        alt="Filled Star"
        style={{ width: "30px", height: "30px" }}
      />
    );
    const emptyStars = Array(5 - stars).fill(
      <img
        src={empty}
        alt="Empty Star"
        style={{ width: "30px", height: "30px" }}
      />
    );
    return [...filledStars, ...emptyStars];
  };

  const handleRentClick = async () => {
    try {
      const response = await fetch(
        "https://d13n7tjnve.execute-api.us-east-1.amazonaws.com/dev/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ movie_id: movie_id }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create payment order");
      }

      const { order_id, amount, key } = await response.json();

      const options = {
        key: key,
        amount: amount,
        currency: "INR",
        name: "MovieNetwork",
        description: "Movie rental payment",
        order_id: order_id,
        handler: async function (response) {
          const verifyResponse = await fetch(
            "https://d13n7tjnve.execute-api.us-east-1.amazonaws.com/dev/verifypay",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                movie_id: movie_id,
              }),
            }
          );

          if (!verifyResponse.ok) {
            throw new Error("Payment verification failed");
          }

          const verifyData = await verifyResponse.json();
          console.log(verifyData);
          if (verifyData.success) {
            setPresignedUrl(verifyData.message);
            toast.success("Payment successful! You can now stream the movie.");
          } else {
            toast.error("Payment Failed. Please try again.");
            navigate(`/movieinfo/${movie_id}`);
          }
        },
        prefill: {
          name: `${user.username}`,
          email: `${user.email}`,
        },
        theme: {
          color: "#000064",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error in payment initiation:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  const handleWishlistClick = async () => {
    try {
      const response = await fetch(
        "https://d13n7tjnve.execute-api.us-east-1.amazonaws.com/dev/wishlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", 
          body: JSON.stringify({
            movie_id: movie_id,
            title: movie.title,
            poster_url: movie.poster_url,
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to add movie to wishlist");
      }
  
      const data = await response.json();
  
      if (data.success) {
        toast.success("Movie added to wishlist!");
      } else {
        toast.error("Failed to add movie to wishlist.");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  
  const handleWatchClick = () => {
    if (presignedUrl) {
      navigate("/stream", {
        state: {
          videoUrl: presignedUrl,
        },
      });
    } else {
      toast.error("Movie not available for watching. Please rent it first.");
    }
  };

  return (
    <div
      className="movie-info"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <img src={movie.poster_url} style={backgroundImageStyle} alt="" />
      <div className="movie-deatil1">
        <img
          className="movie-poster"
          src={movie.poster_url}
          alt="Movie Poster"
        />
        <div className="movie-content">
          <h1 className="heading">
            Title: <span>{movie.title}</span>
          </h1>
          <br />
          <h3 className="company">
            Company: <span>{movie.company}</span>
          </h3>
          <h3 className="company">
            Director: <span>{movie.director}</span>{" "}
          </h3>
          <div className="genres">
            <span>{movie.genre}</span>
          </div>
          <h2>{renderStars(movie.rating)}</h2>

          <h3 className="price">
            Price: <span style={{ margin: '0 1em 0 0' }}>₹{movie.price}</span>{'    '}Time: <span>{`${Math.floor(movie.duration / 60)} hr ${movie.duration % 60} min`}</span>
          </h3>
          <h3 className="year">
            Year: <span>{new Date(movie.release_date).getFullYear()}</span>{" "}
          </h3>
          <h2 className="imdb">
            imDb : <span>{movie.rating}</span>
          </h2>
          <h3 className="Likes">
            Likes: <span>{likes}</span>
            <button className="likebutton" onClick={updateLikes}>
              👍
            </button>
          </h3>
          <div className="button-Group">
            {presignedUrl ? (
              <button className="rentbutton" onClick={handleWatchClick}>
                <i className="fas fa-play"></i> Play
              </button>
            ) : (
              <button className="rentbutton" onClick={handleRentClick}>
                <i class="fas fa-tag"></i> Rent it!
              </button>
            )}
            <button className="savebutton" onClick={handleWishlistClick}>
              <i class="fas fa-bookmark"></i> Wishlist
            </button>
          </div>
        </div>
      </div>
      <div className="movie-deatil2">
        <h1>Plot</h1>
        <h3>{movie.description}</h3>
      </div>
      <div className="trailer-box">
        <iframe
          src={`https://www.youtube.com/embed/${extractVideoId(
            movie.trailer_url
          )}?autoplay=1&mute=0`}
          title="Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="castandcrew">
        <div className="cast">
          <h2>Cast</h2>
          <div>
            <h1>🙋</h1>
            <h4>{movie.actors[0]}</h4>
          </div>
          <div>
            <h1>💁‍♂️</h1>
            <h4>{movie.actors[1]}</h4>
          </div>
          <div>
            <h1>🙋‍♂️</h1>
            <h4>{movie.actors[2]}</h4>
          </div>
        </div>
        <div className="crew">
          <h2>Crew</h2>
          <div>
            <span>Director </span>
            <h4>{movie.director}</h4>
          </div>
          <div>
            <span>Producer </span>
            <h4>{movie.producer}</h4>
          </div>
          <div>
            <span>Company </span>
            <h4>{movie.company}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movieinfo;
