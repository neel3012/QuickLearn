import React, { useState, useEffect, useContext } from "react";
import driv from "../../assets/drive.png";
import "./addcoursehere.css"; import "react-toastify/dist/ReactToastify.css";
import {
  styled,
  Box,
  TextareaAutosize,
  Button,
  InputBase,
  FormControl,
} from "@mui/material";
import { toast, ToastContainer } from 'react-toastify';
import swal from "sweetalert";
import { AddCircle as Add } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { sendtutordata } from "../../app/features/tutorReducer";
import dollar from "../../assets/shop.png";
import clock from "../../assets/clock.jpeg";
const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "fill",
});

const StyledFormControl = styled(FormControl)`
  margin: 10px;
  display: flex;
  flex-direction: row;

  align-items: center;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 40px 30px;
  font-size: 25px;
  border-radius: 8px;
  padding: 12px 16px;
  border: 1px solid #ccc;
`;
const MyPersonal = styled(Container)``;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  margin-top: 50px;
  font-size: 18px;
  &:focus-visible {
    outline: none;
  }
`;

const Addcoursehere = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const gettutordata = useSelector(sendtutordata);
  const initialPost = {
    addedBy: gettutordata.findusername.username,
    title: "",
    description: "",
    picture: "",
    price: "",
    drive: "",
    approximateHours: "",
    userfile: "",
    videoUrl: "",
    createdDate: new Date(),
  };

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const [filedata, setfiledata] = useState("");
  const [video, setVideo] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setloading] = useState(false);
  const [upload,setupload]= useState(false);

  const url = post?.picture
    ? post?.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  useEffect(() => {
    const getImage = async () => {
      console.log("value for file", file);

      if (file) {
        let data = new FormData();
        data.append("file", file);
        data.append("name", file.name);
        console.log(data);
        try {
          const res = await fetch("http://localhost:5000/file/upload", {
            method: "POST",
            body: data, //finally make changes here
          });

          const imageData = await res.json();
          console.log("image stored", imageData);

          setPost((prevPost) => ({
            ...prevPost,
            picture: imageData,
          }));
        } catch (error) {
          console.error("Error uploading image", error);
        }
      }
    };

    getImage();
  }, [file]);

  const handleVideoChange = (e) => {
   
    const selectedFile = e.target.files[0];
  if (selectedFile) {
    const fileType = selectedFile.type;
    if (fileType.startsWith("video/")) {
      setVideo(selectedFile);
    } else {
      toast.error("Please select a valid video file (MP4 format).");
    }
  }
  };
  console.log(video);

  // Function to upload the selected video file
  const uploadVideo = async () => {
    console.log("hello");
    setupload(true)
    if (video) {
      let videoData = new FormData();
      videoData.append("video", video);
      console.log("vdata", videoData);
      try {
        const res = await fetch("http://localhost:5000/video/upload", {
          method: "POST",
          body: videoData,
        });

        const videoDataResponse = await res.json();
        console.log("Video stored", videoDataResponse);
        setupload(false)
        if(videoDataResponse){
          toast.success('video uploaded successfully!')
        }
        setPost((prevPost) => ({
          ...prevPost,
          videoUrl: videoDataResponse,
        }));
      } catch (error) {
        console.error("Error uploading video", error);
        setupload(false)
      }
    }
  };

  const getFiles = async () => {
    setloading(true);
    console.log(filedata);
    if (filedata) {
      let data1 = new FormData();
      data1.append("file", filedata);
      data1.append("name", filedata.name);
      // data1.append("name", );
      console.log(data1);
      try {
        const res = await fetch(
          "http://localhost:5000/uploadedfile/uploadtutorfile",
          {
            method: "POST",
            body: data1,
          }
        );

        const fileUploadedData = await res.json();
        setloading(false);
        if (fileUploadedData) {
          swal("course work addded successfully", "success");
        }
        console.log("file stored", fileUploadedData);

        setPost((prevPost) => ({
          ...prevPost,
          userfile: fileUploadedData,
        }));
      } catch (error) {
        console.error("Error uploading file", error);
      }
    } else {
      console.log("file data is undefined");
    }
  };

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };
  //url post to save whole course
  const validateForm = () => {
    const errors = {};

    // Check if any required fields are empty
    if (post.addedBy.trim() === "") {
      errors.addedBy = "Added by is required";
    }
    if (post.title.trim() === "") {
      errors.title = "Title is required";
    }
    if (post.description.trim() === "") {
      errors.description = "Description is required";
    }
    if (post.price.trim() === "") {
      errors.price = "Price is required";
    } else if (isNaN(post.price)) {
      errors.price = "Price must be a number";
    }
    if (post.approximateHours.trim() === "") {
      errors.approximateHours = "Approximate Hours is required";
    } else if (isNaN(post.approximateHours)) {
      errors.approximateHours = "Approximate Hours must be a number";
    }

    setValidationErrors(errors);

    // Return true if there are no errors, false otherwise
    return Object.keys(errors).length === 0;
  };
  const savePost = async () => {
    // await API.createPost(post);
    // navigate('/');
    const isValid = validateForm();

    if (!isValid) {
      console.log("Form validation failed");
      swal("Failed", "Vlidation failed due to empty or incorrect values...");
      return;
    }

    console.log("post data before sned", post); //done
    const res = await fetch("http://localhost:5000/addnewcourse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    const coursedata = await res.json();
    swal("course added successfully!", "You clicked the button!", "success");
    navigate("/addcourses");
    console.log("front end res", coursedata);
  };

  const handlechangesforfile=(e)=>{
    
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (fileType === "application/pdf") {
        setfiledata(selectedFile);
      } else {
        toast.error("Please select a valid PDF file.");
      }
    }
  }
  

  return (
    <Container>
       <ToastContainer />
      <MyPersonal>
        <Image src={url} alt="post" />
      </MyPersonal>

      <StyledFormControl>
        <label htmlFor="fileInput">
          <Add fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <InputTextField
          onChange={(e) => handleChange(e)}
          name="title"
          placeholder="Title"
        />

        
      </StyledFormControl>

      <Textarea
        rowsMin={5}
        placeholder="Tell your description..."
        name="description"
        className="course_descr"
        onChange={(e) => handleChange(e)}
      />
      <div className="addcourses_main">
        <div className="ad_indisp">
          <img className="in_image" src={driv} alt="drive"></img>
          <InputTextField
            onChange={(e) => handleChange(e)}
            name="drive"
            placeholder="Drive Link"
            className="course_priceinput"
          />
        </div>

        <div className="ad_indisp">
          <img className="in_image" src={dollar} alt="dollar"></img>
          <InputTextField
            onChange={(e) => handleChange(e)}
            name="price"
            type="number"
            placeholder="Course Price In CAD"
            className="course_priceinput"
          />
        </div>

        <div className="ad_indisp">
          <img className="in_image" src={clock} alt="clock"></img>
          <InputTextField
            onChange={(e) => handleChange(e)}
            name="approximateHours"
            type="number"
            placeholder="Approximate Hours"
            className="course_priceinput"
          />
        </div>

        <div className="ad_indisp1">
          Choose your learning material file and upload (Must in PDF format)
          <div>
            <InputTextField
              type="file"
              onChange={handlechangesforfile} 
              name="textfile"
              accept=".pdf"
              placeholder="select file to upload"
              className="course_fileupload"
            />

            
            <Button
              onClick={() => getFiles()}
              variant="contained"
              color="primary"
            >
              {loading ? (<div>Uploading...</div>):"Upload"}
            </Button>
          </div>
        </div>
        {/* <label htmlFor="videoInput">
          <Add fontSize="large" color="action" />
        </label>
        <InputTextField
          type="file"
          id="videoInput"
          style={{ display: "none" }}
          onChange={handleVideoChange}
        />

        <Button
          onClick={() => uploadVideo()}
          variant="contained"
          color="primary"
        >
          Upload Video
        </Button> */}
         <div className="ad_indisp1">
          Record your learning material video and upload (Must in MP4 format)
          <div>
           
             <InputTextField
          type="file"
          id="videoInput"
          name="videofile"
          accept="video/mp4"
          onChange={handleVideoChange}
          placeholder="select file to upload"
          className="course_fileupload"
        />

            
<Button
          onClick={() => uploadVideo()}
          variant="contained"
          color="primary"
        >
              {upload ? (<div>Uploading video...</div>):"Upload"}
            </Button>
          </div>
        </div>
       
       

      
      </div>



      <Button onClick={() => savePost()} variant="contained" color="primary">
          Publish
        </Button>
    </Container>
  );
};

export default Addcoursehere;
