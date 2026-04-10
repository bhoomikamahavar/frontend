import { useEffect, useState } from 'react';
import './App.css'
import SignUp from './auth/register/SignUp';
import Login from './auth/Login';
import Home from './components/Home';
import CreateProduct from "./productcrud/AddProduct";
import Header from './common/Header';
import {createBrowserRouter,RouterProvider,Outlet} from "react-router-dom"
import ListItem from './components/ListItem';
import GetProducts from './productcrud/GetProduct';
import MoreDetails from './productcrud/MoreDetails';
import UpdateProduct from './productcrud/UpdateProduct';
const Layout = () => {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}
function App() {

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/signup",
      element: <SignUp/>,
    },
    {
      path: "/",
      element: <Layout/>,
      children: [
        { index: true, element: <Home/>  },
        { path: "/home", element: <Home/> },
        { path: "/addproduct", element: <CreateProduct/> },
        { path: "/getproducts", element: <GetProducts/> },
        { path: "/product/:id", element: <MoreDetails/> },
        { path: "/listitem", element: <ListItem/> },
        { path: "/updateproduct/:id", element: <UpdateProduct/> }
      ]
    }
  ])

  

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App