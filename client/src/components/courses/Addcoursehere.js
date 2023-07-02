import React, { useState, useEffect, useContext } from "react";
import './addcoursehere.css'
import {
  styled,
  Box,
  TextareaAutosize,
  Button,
  InputBase,
  FormControl,
} from "@mui/material";
import swal from 'sweetalert';
import { AddCircle as Add } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { sendtutordata } from "../../app/features/tutorReducer";

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
    addedBy:gettutordata.findusername.username,
    title: "",
    description: "",
    picture: "",
    price:'',
    approximateHours:'',
    userfile:"",
    createdDate: new Date(),
  };
  
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const [filedata,setfiledata]=useState('');
  // const { account } = useContext(DataContext);
  const [validationErrors, setValidationErrors] = useState({});

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
        console.log(data)
        try {
          
          const res = await fetch("http://localhost:5000/file/upload", {
            method: "POST",
            body: data, //finally make changes here
          });

          const imageData = await res.json();
          console.log("image stored", imageData);

          // setPost((prevPost) => ({
          //   ...prevPost,
          //   picture: imageData.data,
          // }));
          // post.picture = imageData;
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


   

  
      // setPost((prevPost) => ({
      //   ...prevPost,
      // }));
  }, [file]);
  // const getFiles = async () => {
     
      
  //   if (filedata) {
  //     let data1 = new FormData();
  //     data1.append("file", filedata);
  //     data1.append("name", filedata.name);
  //     console.log("value for file in file section", filedata);
  //     console.log(data1)
  //     try {
        
  //       const res = await fetch("http://localhost:5000/coursefiles/upload", {
  //         method: "POST",
  //         body: data1, //finally make changes here
  //       });

  //       const fileuploadedData = await res.json();
  //       console.log("file stored", fileuploadedData);

  //       // setPost((prevPost) => ({
  //       //   ...prevPost,
  //       //   picture: imageData.data,
  //       // }));
  //       post.userfile = fileuploadedData;
  //     } catch (error) {
  //       console.error("Error uploading in files", error);
  //     }
  //   }
  // };
  const getFiles = async () => {
    if (filedata) {
      let data1 = new FormData();
      data1.append("file", filedata);
      data1.append("name", filedata.name);
  
      try {
        const res = await fetch("http://localhost:5000/uploadedfile/upload", {
          method: "POST",
          body: data1,
        });
  
        const fileUploadedData = await res.json();
        console.log("file stored", fileUploadedData);
  
        setPost((prevPost) => ({
          ...prevPost,
          userfile: fileUploadedData,
        }));
      } catch (error) {
        console.error("Error uploading file", error);
      }
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
      swal("Failed","Vlidation failed due to empty or incorrect values...")
      return;
    }
    
    console.log("post data before sned", post);
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

  return (
    <Container>
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

        <Button onClick={() => savePost()} variant="contained" color="primary">
          Publish
        </Button>
      </StyledFormControl>

      <Textarea
        rowsMin={5}
        placeholder="Tell your description..."
        name="description"
        className="course_descr"
        onChange={(e) => handleChange(e)}
      />
     <div className="addcourses_main">
        <InputTextField
          onChange={(e) => handleChange(e)}
          name="price"
          placeholder="Price"
          className="course_priceinput"
        />
        <InputTextField
          onChange={(e) => handleChange(e)}
          name="approximateHours"
          placeholder="Approximate Hours"
          className="course_priceinput"
        />
         <InputTextField
         type="file"
          onChange={(e) => setfiledata(e.target.files[0])}
          name="textfile"
          placeholder="select file to upload"
          className="course_priceinput"
        />
        
        <Button onClick={() => getFiles()} variant="contained" color="primary">Upload</Button>
       
      </div>
    </Container>
  );
};

export default Addcoursehere;
