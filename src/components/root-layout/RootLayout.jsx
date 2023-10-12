import React from 'react'
import { Outlet } from 'react-router-dom'
import Sightbar from '../sightbar/Sightbar'

const RootLayout = () => {
  return (
    <>
        <div className="grid grid-cols-12">
            <div className="col-span-2">
                <Sightbar/>
            </div>
            <div className="col-span-10">
                <Outlet/>
            </div>
        </div>
    </>
  )
}

export default RootLayout