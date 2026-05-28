import React from 'react'
import Hero from '../components/Home/Hero'
import Header from '../components/Home/Header'
import { Route } from 'react-router-dom'
import NotFound from "../pages/NoFound"
import { Calculator } from '../components/Home/Calculator'
import { Destinations } from '../components/Home/Destination'
import { TourPackages } from '../components/Home/Tourpackages'
import { Gallery } from '../components/Home/Gallery'
import { Reviews } from '../components/Home/Reviews'
import { WhyChooseUs } from '../components/Home/Chooseus'
import { Contactus } from '../components/Home/Contactus'
import Footer from '../components/Home/Footer'







const Dashboard = () => {
  return (
    <div>
      <Header />

      <main className="flex-grow">
        <Hero />
        
        <Calculator />
        
        <Destinations />
        
        <TourPackages />
        
        <Gallery />
        
        <Reviews />
        
        <WhyChooseUs />
        
        <Contactus />
        
      </main>

      <Footer />


     

    </div>
  )
}

export default Dashboard