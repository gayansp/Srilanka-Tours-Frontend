import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from '../../components/admin/Header'
import NoFound from '../NoFound'
import Destination from "../admin/Destination"


const AdminDashboard = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/destinations' element={<Destination />} />
        <Route path='/*' element={<NoFound />} />
      </Routes>
    </div>
  )
}

export default AdminDashboard