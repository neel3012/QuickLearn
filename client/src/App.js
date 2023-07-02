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

function App() {
   const isTutorAuthenticated = useSelector(checkTutorAuthentication);
  //if not possible then change name of tutor
  return (
    <>
      
      {/* new added */}
    <Navbar/>
    <Routes>
        
         <Route path='/joinasteacher' element={<Joinasteacher/>}/>
         {isTutorAuthenticated && (<Route path='/addcourses' element={<Addcourses/>}/>)}
         {isTutorAuthenticated && (<Route path='/addcoursehere' element={<Addcoursehere/>}/>)}

         {/* <Route path='/addcourses' element={<Addcourses/>}/> */}
         <Route path='/' element={<Home/>}/>
         <Route path="*" element={<NotFound />} />
   </Routes>
   <Footer/>
   
    </>
   
  );
}

export default App;
