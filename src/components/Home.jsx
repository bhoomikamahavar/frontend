import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CreateProduct from '../productcrud/AddProduct';
 
const Home = () => {
  const navigate = useNavigate();
   
  return (
    <>
      <CreateProduct/>
    </>
  );
}

export default Home