import React from 'react'
import herobanner from '../../../assets/herobanner.jpg'
import './HeroBanner.css';
function HeroBanner() {
  return (
    <div className='herobanner'>
        <div className='herobanner_inside'>
           <img src={herobanner} className='herobanner_img' alt='herobanner'/>
            <div className="herobanner_text">
              <h2>Learning that gets you</h2>
              <p>Skills for your present (and your future).<br/> Get started with us.</p>
            </div>
        </div>
       
    </div>
  )
}

export default HeroBanner