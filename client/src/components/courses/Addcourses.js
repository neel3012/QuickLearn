import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { sendtutordata } from "../../app/features/tutorReducer";

import "./addcourses.css";
import Loader from "../Loader";
function Addcourses() {
  const navigate = useNavigate();
  const getalldata = useSelector(sendtutordata);
  const username = getalldata.findusername.username;
  console.log('name of user',username)
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCourseData(username);
  }, []);

  const fetchCourseData = async (username) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:5000/showyourcourses?addedBy=${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setCourseData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const addNewCourse = (e) => {
    e.preventDefault();
    navigate("/addcoursehere");
  };

  //aa page ma basically course count karvana and hoi to aene card banai dekHADVA
  //NA HOI TO NO COURSES ADDED BATAVU
  //AHI USEEFFECT PAR AEK GET METHOD CALL KARVI JE DATABSE MATHI BADHO DATA COURSE NO LAI LE AND DISPLAY KARAVE
  return (
    <>
      <div className="courses_heading">
        <h1>welcome {getalldata.findusername.username} to your courses</h1>
        <button className="course_btn m1" onClick={addNewCourse}>
          Add New Course
        </button>
      </div>
     
      <div className="course_main">
        {isLoading ? (
            <Loader />
        ) : courseData.length > 0 ? (
          courseData.map((course, index) => (
            <NavLink key={index} to={`/courseinfo/${course._id}`} style={{color:"inherit",textDecoration:"none"}}>
              <div className="course_inner" >
                <div className="course_left">
                  <img
                    src={course?.picture}
                    alt="course_pic"
                    className="course_img"
                  ></img>
                </div>
                <div className="course_right">
                  <div className="course_right1">
                    <h3 className="course_mainname n1">{course?.title}</h3>
                    <p className="course_detail n1">
                      {course?.description.length > 200
                        ? course.description.slice(0, 120) + "..."
                        : course?.description}
                    </p>
                    <p className="course_authorname n1">
                      Author: {course?.addedBy}
                    </p>
                    <p className="course_approxtime n1">
                      Approx. <b>{course?.approximateHours} Hours</b> to
                      complete
                    </p>
                  </div>
                  <div className="course_right2">
                    <h3>CA ${course?.price}</h3>
                  </div>
                </div>
              </div>
            </NavLink>
          ))
        ) : (
          <div className="no_courses_added">
            <p>No courses added yet.</p>
          </div>
        )}
      </div>

      {courseData.length > 0 && (
        <button className="course_btn n" onClick={addNewCourse}>
          Add New Course
        </button>
      )}
    </>
  );
}

export default Addcourses;
