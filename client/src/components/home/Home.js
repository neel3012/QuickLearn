import React from 'react'
import HeroBanner from './banner/HeroBanner'
import Becometeacher from './becomeinstructor/Becometeacher';
import Becomestudent from './becomestudent/Becomestudent';
function Home() {
  return (
    <div className='home'>
        <HeroBanner/>
        <Becometeacher/>
        <Becomestudent/>
      
    </div>
  )
}

export default Home