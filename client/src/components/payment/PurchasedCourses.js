
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { checkStudentAuthentication, sendStudentdata } from '../../app/features/studentReducer';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, CircularProgress } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import '../searchresult.css';
import Loader from '../Loader';

function PurchasedCourses() {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState([]);
  const [purchase, setPurchase] = useState([]);
  const [loading, setLoading] = useState(true);
  const isStudentStillPresent = useSelector(checkStudentAuthentication);
  const studentloggeddata=useSelector(sendStudentdata)
  const uname=studentloggeddata?.findusername?.username
  useEffect(() => {
    fetchCourseData();
  }, []);



  const fetchCourseData = async () => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:5000/findpurchasedcoursebyid', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Name': uname,
        },
      });
      const data = await response.json();
      if(data.error){
        console.log('err is here')
      }
      setCourseData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };




  const fetchIndividualPurchaseData = async (dataIds) => {
    try {
      setLoading(true);
      const purchasePromises = dataIds.map(async (dataId) => {
        const response = await fetch(`http://localhost:5000/findbyidandshow?_id=${dataId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.json();
      });

      const purchaseData = await Promise.all(purchasePromises);
      console.log('trans purchase',purchaseData)
      setPurchase(purchaseData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseData.length > 0) {
      const dataIds = courseData;
      fetchIndividualPurchaseData(dataIds);
    }
  }, [courseData]);

  const clickthbutton=(data)=>{
    navigate(`/authorize/access/${data._id}`)
  }
  return (
    <>
      {isStudentStillPresent ? (
      loading ? (
        <Loader/>
      ) : (
        <>
          {purchase.length > 0 && (
            <div>
              <div className="yt_header">
                <h1>
                  Welcome To <span>Premium</span> Portal
                </h1>
                <p>Learn and explore across <span>{purchase.length}</span> purchased courses!!</p>
                {/* Search bar */}
              </div>
              <div className="yt_videos">
                {purchase
                 
                  .map((data, index) => (
                    <div className="coursein_video" key={data?._id} onClick={()=>clickthbutton(data)}>
                      <div className="yt_img">
                        <img src={data?.picture} alt="course_img" />
                      </div>
                      <div className="yt_nameandlogo">
                        <Avatar
                          alt={data?.addedBy}
                          sx={{ bgcolor: deepOrange[500] }}
                          style={{ textTransform: 'capitalize' }}
                          src={`http://graph.facebook.com/${data?.addedBy}/picture?type=large`}
                        />
                        <div>{data?.title}</div>
                      </div>
                      <div className="yt_description">
                        <p>{data?.description?.slice(0, 50)}...</p>
                        <p className="yt_hour">Author: {data?.addedBy}</p>
                        <h3 className="yt_mainprice">Purchased</h3>
                      </div>
                    </div>
                  ))}
              </div>
            </div> 
          )}
          {purchase.length <= 0 && (<><div className='purchased_not'>You are not having any Purchasd courses yet...  <Button variant='contained' onClick={()=>navigate('/showavailablecourses')} color='warning' >Available Courses</Button></div>
          </>)}
        </>
      )
      ) : (
        navigate('/joinasstudent')
      )}
      
    </>
  );
}

export default PurchasedCourses;
