import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from '../../components/admin/AHeader'
import NoFound from '../NoFound'
import Destination from "../admin/Destination"
import Rate from "../admin/Rate"
import Admingaller from '../admin/Admingallery'
import AdminTours from './Tours'
import AdminDash from './Admin'








const AdminDashboard = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<AdminDash />} />
        <Route path='/destinations' element={<Destination />} />
        <Route path='/Rate' element={<Rate />} />
        <Route path='/gallery' element={<Admingaller />} />
        <Route path='/Tours' element={<AdminTours />} />
        <Route path='/*' element={<NoFound />} />
      </Routes>
    </div>
  )
}

export default AdminDashboard