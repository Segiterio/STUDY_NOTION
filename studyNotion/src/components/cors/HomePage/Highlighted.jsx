import React from 'react'

 const Highlighted = ({color,children}) => {
  return (
    <span className={`${color} bg-clip-text text-transparent`}>{children}</span>
  )
}
export default Highlighted;