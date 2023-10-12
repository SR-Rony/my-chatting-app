import React from 'react'
import { Link } from 'react-router-dom'

const Hadding = ({className,text,span}) => {
  return (
    <h2 className={`${className} font-bold font-outfit text-3xl`}>{text}<span className='text-primary'>{span}</span></h2>
  )
}

export default Hadding