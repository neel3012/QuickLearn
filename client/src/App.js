import React from 'react';
import './App.css';
import {

  Routes,
  Route,
  useNavigate,
  Navigate

} from "react-router-dom";
import Navbar from './components/heading/Navbar'
import Home from './components/home/Home'
import Joinasteacher from './components/home/becomeinstructor/Joinasteacher'
import Footer from './components/footer/Footer'
import Addcourses from './components/courses/Addcourses';
import { useSelector } from 'react-redux';
import { checkTutorAuthentication } from './app/features/tutorReducer';
import NotFound from './components/NotFound';
import Addcoursehere from './components/courses/Addcoursehere';
import CourseDetails from './components/courses/CourseDetails';
import Allcourses from './components/courses/Allcourses';
import Joinasstudent from './components/home/becomestudent/Joinasstudent';
import Student from './components/home/becomestudent/Student';
import SearchResults from './components/SearchResults';
import VideoPage from './components/VideoPage';
import { checkStudentAuthentication } from './app/features/studentReducer';
import Availablecourses from './components/home/becomestudent/Availablecourses';
import Becometeacher from './components/home/becomeinstructor/Becometeacher';
import Availablecoursesbyid from './components/courses/Availablecoursesbyid';
import PurchasedCourses from './components/payment/PurchasedCourses';
import Authorizematerial from './components/courses/Authorizematerial';

function App() {
   const isTutorAuthenticated = useSelector(checkTutorAuthentication);
   const isStudentAuthenticated=useSelector(checkStudentAuthentication);
  //if not possible then change name of tutor
  return (
    <>
      
      {/* new added */}
    <Navbar/>
    <Routes>
        
         <Route path='/joinasteacher' element={<Joinasteacher/>}/>
         {isTutorAuthenticated && (<Route path='/addcourses' element={<Addcourses/>}/>)}
         {isTutorAuthenticated && (<Route path='/addcoursehere' element={<Addcoursehere/>}/>)}
         {isTutorAuthenticated || isStudentAuthenticated?(<Route path='/courseinfo/:courseID' element={<CourseDetails/>}/>):( <Route path='/' element={<Home/>}/>)}
         {isTutorAuthenticated || isStudentAuthenticated && <Route path='/mylearning' element={<Allcourses/>}/>}
         {/* <Route path='/addcourses' element={<Addcourses/>}/> */}
         <Route path='/joinasstudent' element={<Joinasstudent/>}/>
          
        {isStudentAuthenticated && (<Route path='/showavailablecourses' element={<Availablecourses/>}/>)}
        {isStudentAuthenticated && (<Route path='/showcoursebyidforstudent/:courseID' element={<Availablecoursesbyid/>}/>)}
        
        {isStudentAuthenticated && <Route path='/purchasedCourses' element={<PurchasedCourses/>}/>}
        {isStudentAuthenticated && <Route path='authorize/access/:courseID' element={<Authorizematerial/>}/>}
         <Route path="/search" element={<SearchResults />} />
         <Route path="/video/:videoId" element={<VideoPage />} />
         <Route path='/' element={<Home/>}/>
         <Route path="*" element={< Joinasstudent/>} />
   </Routes>
   <Footer/>
   
    </>
   
  );
}

export default App;
