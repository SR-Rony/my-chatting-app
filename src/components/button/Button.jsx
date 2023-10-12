import React from 'react'

const Button = ({text,className}) => {
  return (
    <button className={`${className} font-outfit font-bold text-xl bg-primary hover:bg-transparent hover:text-primary py-2 border border-solid border-primary rounded-md `}>{text}</button>
  )
}

export default Button