import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from '../../components/admin/AHeader'
import NoFound from '../NoFound'
import Destination from "../admin/Destination"
import Admingaller from '../admin/Admingallery'
import AdminTours from './Tours'
import AdminDash from './Admin'
import Vehicle from './Vehicle'








const AdminDashboard = () => {
  return (
    <div className='h-screen w-full bg-gray-100'>
      <Header />
      <div className='pt-16 h-[calc(100vh-69px)] overflow-y-auto'>
        <Routes>
        <Route path='/' element={<AdminDash />} />
        <Route path='/destinations' element={<Destination />} />
        <Route path='/vehicles' element={<Vehicle />} />
        <Route path='/gallery' element={<Admingaller />} />
        <Route path='/Tours' element={<AdminTours />} />
        <Route path='/*' element={<NoFound />} />
      </Routes>
      </div>
    </div>
  )
}

export default AdminDashboard