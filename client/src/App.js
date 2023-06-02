import React from 'react';
import './App.css';
import {

  Routes,
  Route,

} from "react-router-dom";
import Navbar from './components/heading/Navbar'
import Home from './components/home/Home'
import Joinasteacher from './components/home/becomeinstructor/Joinasteacher'
import Footer from './components/footer/Footer'
function App() {
  
  return (
    <>
    <Navbar/>
    <Routes>
        
         <Route path='/joinasteacher' element={<Joinasteacher/>}/>
         <Route path='/' element={<Home/>}/>
   </Routes>
   <Footer/>
    </>
   
  );
}

export default App;
