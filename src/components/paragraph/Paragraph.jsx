import React from 'react'
import { Link } from 'react-router-dom'

const Paragraph = ({className,text,link,path}) => {
  return (
    <p className={`${className} font-outfit font-bold sm`}>{text}<Link className='text-primary ml-2' to={path}>{link}</Link></p>
  )
}

export default Paragraph