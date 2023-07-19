import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { sendtutordata } from '../../app/features/tutorReducer';

function Authorizematerial() {
    const { courseID } = useParams();
    const [courseData, setCourseData] = useState({});
    


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

        
      </div>
    </div>

   </>
  )
}

export default Authorizematerial