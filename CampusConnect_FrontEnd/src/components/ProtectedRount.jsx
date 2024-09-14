import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRount = ({children}) => {
  const token = localStorage.getItem('accessToken')
  let location = useLocation()
  if(!token){
    return <Navigate to={'/Login'} state={{from : location}} replace/>
  }
  return children
}

export default ProtectedRount