import  { FunctionComponent } from 'react'
import { Outlet } from 'react-router';
import { NavBar } from '../components/NavBar/NavBar';

export const BasePageLayout:FunctionComponent = () => {
  return (
      <>
        <NavBar/>
        <Outlet/>
      </>
  )
}
