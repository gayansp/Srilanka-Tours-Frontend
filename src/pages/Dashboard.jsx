import React from 'react'
import Hero from '../components/Home/Hero'
import Header from '../components/Home/Header'
import { Route, Routes } from 'react-router-dom'
import NotFound from "../pages/NoFound"
import { WhyChooseUs } from '../components/Home/Chooseus'

import Footer from '../components/Home/Footer'
import UserDash from './UserDash'
import { Destinations } from '../components/Home/Destination'
import { TourPackages } from '../components/Home/Tourpackages'
import { Gallery } from '../components/Home/Gallery'
import { Reviews } from '../components/Home/Reviews'
import { Contactus } from '../components/Home/Contactus'









const Dashboard = () => {
  return (
    <div>
      <Header />

      <main className="flex-grow">
        
        <Routes>
          <Route path='/' element={<UserDash />} />
          <Route path='/destinations' element={<Destinations />} />
          <Route path='/tours' element={<TourPackages />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/about' element={<Reviews />} />
   
          <Route path='/contact' element={<Contactus />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
        
      </main>

      <Footer />


     

    </div>
  )
}

export default Dashboard