import React from 'react'

const Image = ({src,className}) => {
  return (
    <img className={`${className} rounded-full object-cover`} src={src} alt="img"/>
  )
}

export default Image