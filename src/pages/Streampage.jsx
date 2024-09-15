import React from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';
import './Streampage.css';

const Streampage = () => {
  const location = useLocation();
  const videoUrl = location.state?.videoUrl;

  if (!videoUrl) {
    return <div>No video URL provided.</div>;
  }

  return (
    <div className="video-player">
      <div className="react-player-wrapper">
        <ReactPlayer
          url={videoUrl}
          controls
          width="100%"
          height="100%"
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload', // Disable download option
              },
            },
          }}
        />

      </div>
    </div>
  );
};

export default Streampage;
