import React from 'react'
import HeroBanner from './banner/HeroBanner'
import Becometeacher from './becomeinstructor/Becometeacher';
function Home() {
  return (
    <div className='home'>
        <HeroBanner/>
        <Becometeacher/>
      
    </div>
  )
}

export default Home