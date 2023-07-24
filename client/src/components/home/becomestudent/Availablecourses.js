


import { Avatar, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "../../../assets/back.jpg";
import { useNavigate } from "react-router-dom";
import '../../searchresult.css'
import { deepOrange } from "@mui/material/colors";

const Availablecourses = () => {
  const [courseData, setCourseData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  console.log("course data is", courseData);

  useEffect(() => {
    fetchCourseData();
  }, []);

  const fetchCourseData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/showallcourses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log('inner data',data)
      setCourseData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCourseClick = (data) => {
    navigate(`/showcoursebyidforstudent/${data._id}`);
    console.log('data from inside', data);
  }

  return (
    <>
      <div className="yt_header">
        <h1>
          excess <span>Premium</span> learning and grow
        </h1>
        <p>Click on the course to access and explore!</p>
        {/* Search bar */}
        <TextField
        style={{margin:'20px',height:'10px',width:'40vw'}}
          id="search"
          label="Search for course"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="yt_videos">
        {courseData?.map((data) => {
          // Filter courses based on the search query
          if (!data.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            return null // Return null to hide courses that don't match the search query
          }

          return (
            <div className="coursein_video" key={data?._id} onClick={() => handleCourseClick(data)}>
              <div className="yt_img">
                <img src={data?.picture} alt="course_img" />
              </div>
              <div className="yt_nameandlogo">
                <Avatar alt={data?.addedBy} sx={{ bgcolor: deepOrange[500] }} style={{ textTransform: "capitalize" }} src="http://graph.facebook.com/{user-id}/picture?type=large"/>
                <div>
                  {data?.title}
                </div>
              </div>
              <div className="yt_description">
                <p>{data?.description?.slice(0, 50)}...</p>
                <p className="yt_hour">Author: {data?.addedBy}</p>
                <h3 className="yt_mainprice">CAD ${data?.price}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Availablecourses;

