import React from 'react'
import { useSelector } from 'react-redux';
import ErrorPage from './ErrorPage';

const OpenRoute = ({children}) => {
   
    const {token} = useSelector(state => state.auth);

  return (
    <>
         {token === null ? children : <ErrorPage/> }
    </>
  )
}

export default OpenRoute;