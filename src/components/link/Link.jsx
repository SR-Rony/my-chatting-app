import React from 'react'
import { Link } from 'react-router-dom'

const Link = ({text,path}) => {
  return (
    <Link path={path}>{text}</Link>
  )
}

export default Link