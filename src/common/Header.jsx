import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react';
const Header = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Cart Items:", cart);
    setCount(cart.length);
  }, []);
  return (
    <div className="pb-5">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/home">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/getproducts">All Product</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/addproduct">
                  Add Product
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/listitem">
                  <i className="bi bi-basket-fill"></i>{count}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              </li>              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header