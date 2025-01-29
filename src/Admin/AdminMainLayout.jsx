import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminLeftSidebar from './AdminLeftSidebar'

const AdminMainLayout = () => {
  return (
    <div >
        <AdminLeftSidebar/>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default AdminMainLayout