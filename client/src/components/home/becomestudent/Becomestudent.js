import React from 'react'
import './becomestudent.css';
import {Link} from 'react-router-dom'
function Becomestudent() {
  return (
     <div className='teacher'>
        <div className='inner_teacher'>
            
            <div className='teacher_second'>
                <h1>Become a student</h1>
                <p>Join as a student and make your</p>
                <p>career brighter and sharpen your skills.</p>
               <Link to='/joinasstudent'><button className='teacher_button'>Get started</button></Link>
            </div>
            <img className='teacher_img' src="https://img.freepik.com/free-photo/front-view-male-student-wearing-black-backpack-holding-copybooks-smiling-blue-wall_140725-42653.jpg?w=1060&t=st=1688681087~exp=1688681687~hmac=387e0f13f950d91058c7f7f6870bb599a23d8e67c2f30b5b2dda331b9f9b0482" alt='instructure'>

            </img>
        </div>
    </div>
  )
}

export default Becomestudent