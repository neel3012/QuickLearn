import React from 'react'
import teacher from '../../../assets/inst.jpeg'
import './Becomeinstructor.css';
import {Link} from 'react-router-dom'
function Becometeacher() {
  return (
    <div className='teacher'>
        <div className='inner_teacher'>
            <img className='teacher_img' src={teacher} alt='instructure'>

            </img>
            <div className='teacher_second'>
                <h1>Become an instructor</h1>
                <p>Join as a tutor and make this</p>
                <p>more useful for needy students.</p>
               <Link to='/joinasteacher'><button className='teacher_button'>Get started</button></Link>
            </div>
        </div>
    </div>
  )
}

export default Becometeacher