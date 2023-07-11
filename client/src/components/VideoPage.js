import React from 'react';
import { useParams } from 'react-router-dom';
import './searchresult.css';
const VideoPage = () => {
  const { videoId } = useParams();

  return (
    <div className='main_videosec'>
      <h1><span>Watch</span> Video</h1>
      <div className='video_main'>
        <iframe
          
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube Video Player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPage;
