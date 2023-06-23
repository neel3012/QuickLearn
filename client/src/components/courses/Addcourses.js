import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { sendtutordata } from '../../app/features/tutorReducer';
import Banner from '../../assets/banner.png'
import './addcourses.css'
function Addcourses() {
  const navigate = useNavigate();
  
  const getalldata=useSelector(sendtutordata);
   let username=getalldata.findusername.username;
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    fetchCourseData(username);
  }, []);

  const fetchCourseData = async (username) => {
    try {
      const response = await fetch(`http://localhost:5000/showyourcourses?addedBy=${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary authentication headers
        },
      });
      const data = await response.json();
      setCourseData(data);
    } catch (error) {
      console.log(error);
    }
  };

  
  console.log('courses  are',courseData)
  const addnewcourse=(e)=>{
    e.preventDefault();
    navigate('/addcoursehere')
  }
  //aa page ma basically course count karvana and hoi to aene card banai dekHADVA
  //NA HOI TO NO COURSES ADDED BATAVU
  //AHI USEEFFECT PAR AEK GET METHOD CALL KARVI JE DATABSE MATHI BADHO DATA COURSE NO LAI LE AND DISPLAY KARAVE
  return (
    <>
     <h1>welcome {getalldata.findusername.username} to your courses</h1>
     {/* {courseData.length > 0 ? (
        <ul>
          {courseData.map((course) => (
            <li key={course._id}>{course.email}</li>
          ))}
        </ul>
      ) : (
        <p>No courses added yet.</p>
      )} */}
      <div className='course_main'>
         <div className='course_inner'>
              <div className='course_left'>
                <img src={Banner} alt='course_pic' className='course_img'></img>
              </div>
              <div className='course_right'>
                <div className='course_right1'>
                    <h4 className='course_mainname'>Javascript, mongodb, nodejs</h4>
                    <p className='course_detail'>This course is gonna explain about functionalities and main implementation using this provided lanuages...</p>
                    <p className='course_authorname'>Neel patel</p>
                    <p className='course_approxtime'>115 hours</p>
                </div>
                <div className='course_right2'>
                    <h3>CA $120</h3>
                </div>
                

              </div>

          </div>
      </div>

    <button onClick={addnewcourse}>Add New Course</button>
    </>
   
  )
}

export default Addcourses