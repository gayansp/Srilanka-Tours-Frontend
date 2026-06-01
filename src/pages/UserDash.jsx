import React from 'react'
import Hero from '../components/Home/Hero'
import { Calculator } from '../components/Home/Calculator'
import { Destinations } from '../components/Home/Destination'
import { TourPackages } from '../components/Home/Tourpackages'
import { Gallery } from '../components/Home/Gallery'
import { Reviews } from '../components/Home/Reviews'
import { WhyChooseUs } from '../components/Home/Chooseus'
import { Contactus } from '../components/Home/Contactus'

const UserDash = () => {
  return (
    <div>
        <Hero />
        
        <Calculator />
        
        <Destinations />
        
        <TourPackages />
        
        <Gallery  />
        
        <Reviews />
        
        <WhyChooseUs />
        
        <Contactus />
    </div>
  )
}

export default UserDash