import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Addcoursedetails.css";
import { Viewer } from "@react-pdf-viewer/core";
import { sendtutordata } from "../../app/features/tutorReducer";
import {useSelector} from 'react-redux'
import './Addcoursedetails.css'
import { Button } from "@mui/material";
import swal from "sweetalert";
// Plugins
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
function CourseDetails() {
  const [courseData, setCourseData] = useState({});
  const { courseID } = useParams();
  const navigate=useNavigate();
  const selector=useSelector(sendtutordata)
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

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


  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    console.log('del')
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/items/${courseID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Item deleted successfully
        console.log("Item deleted successfully");
        navigate('/addcourses')
        swal("course deleted successfully!", "Click button to view available!", "error");

        // Perform any necessary actions, such as updating the UI
      } else {
        // Handle errors if any
        console.log("Error deleting item");
      }
    } catch (error) {
      console.error("Error deleting item", error);
    }
    setLoading(false);
  };

  return (
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

        <h5 className="view_h5">You logged in as <span className="view_hours1">{selector.findusername.email}</span> as user.</h5>
        <Button variant="outlined" onClick={()=>handleDelete()} className="view_h5" sx={{display:"flex",alignItems:'center',justifyContent:'center'}} color="error">
        {loading ? "Deleting..." : "Delete Course"}</Button>
      </div>
    </div>
  );
}

export default CourseDetails;
