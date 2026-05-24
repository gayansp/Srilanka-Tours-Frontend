import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Destination from './Destination'

const AdminDashboard = () => {
  return (
    <div>

        <Routes>
            <Route path='/destinations' element={<Destination/>} />
        </Routes>
    </div>
  )
}

export default AdminDashboard