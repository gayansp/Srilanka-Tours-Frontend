import React from 'react'
import Hero from '../components/Hero'
import Header from '../components/Header'
import { Route } from 'react-router-dom'
import NotFound from "../pages/NoFound"
import { Calculator } from '../components/Calculator'
import { Destinations } from '../components/Destination'
import { TourPackages } from '../components/Tourpackages'
import { Gallery } from '../components/Gallery'
import { Reviews } from '../components/Reviews'
import { WhyChooseUs } from '../components/Chooseus'
import { Contactus } from '../components/Contactus'
import Footer from '../components/Footer'







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