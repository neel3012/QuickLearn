import React, { useEffect, useState } from 'react';
import Back from '../assets/back.jpg'
import { Avatar } from '@mui/material';
import './searchresult.css'
import { useNavigate } from 'react-router-dom';
const SearchResults = () => {
  const [videos, setVideos] = useState([]);
  const navigate=useNavigate()
 
  // const [setsearch,setseachdata]=useState(searchQuery);
  const searchQuery = new URLSearchParams(window.location.search).get('q');

  useEffect(() => {
    if (searchQuery) {
      fetchVideos(searchQuery);
    }
  }, [searchQuery]);

  const fetchVideos = async (searchQuery) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(searchQuery)}&part=snippet&type=video&&maxResults=10&key=AIzaSyBGl7SCCjcqhc-ukJuFjbkP3OIFnOwuvRQ`
      );
      console.log(response)

      if (response.ok) {
        const data = await response.json();
        setVideos(data.items);
      }
    } catch (error) {
      console.log(error);
    }
  };
   const handleClick=(e)=>{
    
    navigate(`/video/${e.id.videoId}`)
   }
  return (
 
      <>
<div className='yt_header'>
        <h1>excess <span>Free</span> learning ang grow</h1>
        <p>Your search result for {searchQuery}</p>
    </div>
    <div className='yt_videos'>
         {videos.map((video) => (
            
   
    <div className='yt_video' key={video.id.videoId} onClick={()=>handleClick(video)}>
       {console.log(video)}
               <div className='yt_img'>
           <img src={video.snippet.thumbnails.high.url} alt='course_img'/>
                </div>
                <div className='yt_nameandlogo'>
                   <Avatar/>
                    <div>{video.snippet.title.lenght>30 ?  video.snippet.title.slice(0,30): video.snippet.title.slice(0,30).concat('...')}</div>
                </div>
            <div className='yt_description'>
                   <p>{video.snippet.description.slice(0, 50)}...</p> 
                   <p className='yt_hour'>{video.snippet.channelTitle}
</p>
                </div>
            </div>
      ))}
    </div>
     
    </>
  );
};

 export default SearchResults;

