import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./authorize.css";
import drive from "../../assets/drive.png";
import yt from "../../assets/yt (2).png";
import { deepOrange } from "@mui/material/colors";
import axios from "axios";
function Authorizematerial() {
  const { courseID } = useParams();
  const [courseData, setCourseData] = useState({});
  const [videos, setVideos] = useState([]);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showDriveModal, setShowDriveModal] = useState(false);
  const navigate = useNavigate();
  console.log("in is", courseData?.title);
  
  useEffect(() => {
    if (courseData?.title) {
      fetchVideos(courseData?.title);
    }
  }, [courseData?.title]);
  useEffect(() => {
    getCourseData();
  }, [courseID]);




  const fetchVideos = async (searchQuery) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(
          courseData?.title
        )}&part=snippet&type=video&&maxResults=6&key=AIzaSyACg9H0X-JuBNfjTKbI2sQa_nufAXpz628`
      );

      if (response.ok) {
        const data = await response.json();
        setVideos(data.items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (e) => {
    navigate(`/video/${e.id.videoId}`);
  };

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

  const handleDriveModalOpen = () => {
    setShowDriveModal(true);
  };

  const handleDriveModalClose = () => {
    setShowDriveModal(false);
  };
  const [clickyt, setclickyt] = useState(false);
  const handleClickforyt = (e) => {
    setclickyt(true);
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
          <div className="view_description">► {courseData.description}</div>
          <h3 className="view_hoursetting">
            It will take your{" "}
            <span className="view_hours">{courseData.approximateHours}</span>{" "}
            Hours to finish!
          </h3>
        </div>

        <div className="yt_header">
          <h1>
            Excess Premium <span>Material</span> and Related{" "}
            <span>Videos.</span>
          </h1>
          <p>
            Scroll Down To Access Or <span>Download</span>!
          </p>
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

        {/* here i need to enter video from tutor */}

        <div className="tutor_access">
           <div className="tutor_access_n1">
            <h1>Learn, Access And Grow</h1>
            <p>Access your tutor uploaded videos.</p>
            <a href={courseData?.videoUrl} target="_blank"><Button variant="contained" color="warning">Watch Video</Button></a>

           </div>

         {/* <a href={courseData?.videoUrl} target="_blank">Link video</a> */}
        </div>

        <div className="access_drivematerial yt_header">
          <p className="avail_innn">
            Hit Enter And Take Bonus Material By instuctor{" "}
            <b>{courseData?.addedBy}</b>
          </p>
          {/* <Button onClick={handleDriveModalOpen} variant="contained">
            Drive Access for extra material
          </Button> */}
          <div className="drive_yt_setting">
            <div className="drive_btn" onClick={handleDriveModalOpen}>
              <img src={drive} className="drive_img" alt="google_drive" />
            </div>

            <div className="drive_btn" onClick={() => handleClickforyt()}>
              <img src={yt} className="drive_img" alt="google_drive" />
            </div>
          </div>
        </div>

        {clickyt && (
          <div className="related_videos_authorize">
            <div className="yt_header">
              <h1>
                Excess related <span>Open-source Videos</span> and{" "}
                <span>Learn</span>
              </h1>
              {/* Search bar */}
            </div>

            <div className="yt_videos">
              {videos.map((video) => (
                <div
                  className="yt_video"
                  key={video.id.videoId}
                  onClick={() => handleClick(video)}
                >
                  <div className="yt_img">
                    <img
                      src={video.snippet.thumbnails.high.url}
                      alt="course_img"
                    />
                  </div>
                  <div className="yt_nameandlogo">
                    <Avatar sx={{ bgcolor: deepOrange[500] }} />
                    <div>
                      {video.snippet.title.length > 30
                        ? video.snippet.title.slice(0, 30)
                        : video.snippet.title.slice(0, 30).concat("...")}
                    </div>
                  </div>
                  <div className="yt_description">
                    <p>{video.snippet.description.slice(0, 50)}...</p>
                    <p className="yt_hour">{video.snippet.channelTitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* PDF Modal */}

      {/* Drive Modal */}
      <Dialog
        open={showDriveModal}
        onClose={handleDriveModalClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Drive Access
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleDriveModalClose}
            aria-label="close"
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <a target="_blank" href={courseData?.drive}>
            {courseData?.drive}
          </a>
        </DialogContent>
      </Dialog>

      <section className="auth_news"></section>
    </>
  );
}

export default Authorizematerial;
