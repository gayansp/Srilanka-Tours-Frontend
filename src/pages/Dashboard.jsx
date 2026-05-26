import React from 'react'
import Hero from '../components/Hero'
import Header from '../components/Header'
import { Route } from 'react-router-dom'
import NotFound from "../pages/NoFound"

const Dashboard = () => {
  return (
    <div>
      <Header />

      <Hero />

    </div>
  )
}

export default Dashboard