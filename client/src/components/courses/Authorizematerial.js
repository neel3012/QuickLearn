// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { sendtutordata } from '../../app/features/tutorReducer';
// import { Avatar } from '@mui/material';

// function Authorizematerial() {
//     const { courseID } = useParams();
//     const [courseData, setCourseData] = useState({});
//     const [videos, setVideos] = useState([]);

//     const navigate=useNavigate();
//     useEffect(() => {
//       if (courseData?.title) {
//         fetchVideos(courseData?.title);
//       }
//     }, [courseData?.title]);
  
//     const fetchVideos = async (searchQuery) => {
//       try {
//         const response = await fetch(
//           `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(courseData?.title)}&part=snippet&type=video&&maxResults=6&key=AIzaSyBGl7SCCjcqhc-ukJuFjbkP3OIFnOwuvRQ`
//         );
//         console.log(response)
  
//         if (response.ok) {
//           const data = await response.json();
//           setVideos(data.items);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//      const handleClick=(e)=>{
      
//       navigate(`/video/${e.id.videoId}`)
//      }

//     const getCourseData = async () => {
//         try {
//           const response = await fetch(
//             `http://localhost:5000/courseinfo/${courseID}`,
//             {
//               method: "GET",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//             }
//           );
//           const cdata = await response.json();
//           setCourseData(cdata);
//         } catch (err) {
//           console.log(err);
//         }
//       };
    
//       useEffect(() => {
//         getCourseData();
//       }, [courseID]);
    
//   return (
//    <>
//     <div className="view_main">
//       <div className="view_imagesection">
//         <img
//           src={courseData?.picture}
//           className="view_mainimage"
//           alt="courseImage"
//         />
//       </div>
//       <div className="view_mainbody">
//         <div className="view_head">
//           <h1>{courseData?.title}</h1>
//           <p>Author: {courseData?.addedBy}</p>
//         </div>
//         <div className="view_description">⚪ {courseData.description}</div>
//        <h3 className='view_hoursetting'>It will take your <span className='view_hours'>{courseData.approximateHours}</span> Hours to finish!</h3>


//        <div className="yt_header">
//         <h1>
//           excess Premium <span>Material</span> and Related<span> Videos.</span>
//         </h1>
//         <p>Scroll Down To Access Or <span>Download</span>!</p>
//         {/* Search bar */}
       
//       </div>
//         <div className="view_pdfsetting">
//         <object
//           data={courseData?.userfile}
//           type="application/pdf"
         
//           className="view_object"
          
//         >
//           <p>
//             Alternative text - include a link{" "}
//             <a href={courseData?.userfile}>to the PDF!</a>
//           </p>
//         </object>
//         </div>


//         <div>
//           Drive Access for extra material: <a target='_blank' href={courseData?.drive}>{courseData?.drive}</a>
//         </div>

//         <div className='related_videos_authorize'>
//              <div className="yt_header">
//              <h1>
//                  excess related <span>Open-source Videos</span> and <span>Learn</span>
//             </h1>
//         {/* Search bar */}
       
//              </div>

//              <div className='yt_videos'>
//          {videos.map((video) => (
            
   
//     <div className='yt_video' key={video.id.videoId} onClick={()=>handleClick(video)}>
//        {console.log(video)}
//                <div className='yt_img'>
//            <img src={video.snippet.thumbnails.high.url} alt='course_img'/>
//                 </div>
//                 <div className='yt_nameandlogo'>
//                    <Avatar/>
//                     <div>{video.snippet.title.lenght>30 ?  video.snippet.title.slice(0,30): video.snippet.title.slice(0,30).concat('...')}</div>
//                 </div>
//             <div className='yt_description'>
//                    <p>{video.snippet.description.slice(0, 50)}...</p> 
//                    <p className='yt_hour'>{video.snippet.channelTitle}
// </p>
//                 </div>
//             </div>
//       ))}
//     </div>



//         </div>

        
//       </div>
//     </div>

//    </>
//   )
// }

// export default Authorizematerial



import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { sendtutordata } from '../../app/features/tutorReducer';
import { Avatar } from '@mui/material';
const {google} = require('googleapis');
function Authorizematerial() {
    const { courseID } = useParams();
    const [courseData, setCourseData] = useState({});
    const [videos, setVideos] = useState([]);

    const navigate=useNavigate();
    useEffect(() => {
      if (courseData?.title) {
        fetchVideos(courseData?.title);
      }
    }, [courseData?.title]);
  
    const fetchVideos = async (searchQuery) => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(courseData?.title)}&part=snippet&type=video&&maxResults=6&key=AIzaSyBGl7SCCjcqhc-ukJuFjbkP3OIFnOwuvRQ`
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

    const getCourseData = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/courseinfo/${courseID}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const cdata = await response.json();
          setCourseData(cdata);
        } catch (err) {
          console.log(err);
        }
      };
    
      useEffect(() => {
        getCourseData();
      }, [courseID]);
      useEffect(() => {
        if (courseData?.drive) {
          fetchDriveData(courseData.drive);
        }
      }, [courseData.drive]);

      const fetchDriveData = async (driveLink) => {
        try {
          const fileId = extractFileIdFromUrl(driveLink);
          const auth = await getGoogleDriveAuth();
          const drive = google.drive({ version: 'v3', auth });
    
          const response = await drive.files.get({
            fileId,
            alt: 'media',
          });
    
          setDriveData(response.data);
    
        } catch (error) {
          console.error('Error fetching data from Google Drive:', error);
        }
      };
    
      const extractFileIdFromUrl = (url) => {
        const match = url.match(/[-\w]{25,}/);
        return match ? match[0] : null;
      };
    
      const getGoogleDriveAuth = async () => {
        // Replace 'YOUR_API_KEY' with your actual API key obtained from Google Developer Console
        const apiKey = 'AIzaSyCWO-iqS8pzinOTbKq7fHRbC4ToDW5pSN0';
        const { gapi } = window;
    
        await gapi.load('client', () => {
          gapi.client.setApiKey(apiKey);
          gapi.client.load('drive', 'v3');
        });
    
        return gapi.auth2.getAuthInstance().signIn();
      };
    
  return (
   <>
    <div className="view_main">
      <div className="view_imagesection">
        <img
          src={courseData?.picture}
          className="view_mainimage"
          alt="courseImage"
        />
      </div>
      <div className="view_mainbody">
        <div className="view_head">
          <h1>{courseData?.title}</h1>
          <p>Author: {courseData?.addedBy}</p>
        </div>
        <div className="view_description">⚪ {courseData.description}</div>
       <h3 className='view_hoursetting'>It will take your <span className='view_hours'>{courseData.approximateHours}</span> Hours to finish!</h3>


       <div className="yt_header">
        <h1>
          excess Premium <span>Material</span> and Related<span> Videos.</span>
        </h1>
        <p>Scroll Down To Access Or <span>Download</span>!</p>
        {/* Search bar */}
       
      </div>
        <div className="view_pdfsetting">
        <object
          data={courseData?.userfile}
          type="application/pdf"
         
          className="view_object"
          
        >
          <p>
            Alternative text - include a link{" "}
            <a href={courseData?.userfile}>to the PDF!</a>
          </p>
        </object>
        </div>


        <div>
          Drive Access for extra material: <a target='_blank' href={courseData?.drive}>{courseData?.drive}</a>
        </div>

        <div className='related_videos_authorize'>
             <div className="yt_header">
             <h1>
                 excess related <span>Open-source Videos</span> and <span>Learn</span>
            </h1>
        {/* Search bar */}
       
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



        </div>

        
      </div>
    </div>

   </>
  )
}

export default Authorizematerial
