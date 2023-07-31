import React, { useState } from 'react'
import logo from '../../assets/navbar_logo.png'
import './about.css'
function AboutPage() {
    
  return (
    <div className='aboutus'>
    
        <div className='about_left'>
            <h1>QuickLearn.</h1>
<p><b>Our Vision</b>:- 

We envision a world where every student has the opportunity to learn at their own pace and receive expert guidance tailored to their unique needs. By combining cutting-edge technology with the expertise of our dedicated tutors, we aim to make learning an enjoyable and rewarding experience.</p>
    
            <div>
                <h4>75 watline dr.</h4>
                <p>Mississauga</p>
                <p>Ontario</p>
            </div>

        </div>
        <div className='about_right'>
            <img src={logo} alt='brand_name'/>
        </div>
    </div>
  )
}

export default AboutPage