import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:7777/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.status === 200) {
        alert("Login successful ✅");
        navigate("/home");
      } else {
        alert(data.message || "Login failed ❌");
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      
      <div className="card shadow-lg p-4 border-0" style={{ width: "400px", borderRadius: "15px" }}>
        
        <h2 className="text-center mb-4 fw-bold">Welcome Back 👋</h2>

        <form onSubmit={handleSubmit}>
          
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button type="submit" className="btn btn-dark w-100">
            Login
          </button>
        </form>

        {/* Extra Links */}
        <p className="text-center mt-3 small">
          Don’t have an account?{" "}
          <NavLink to="/signup" className="fw-semibold text-decoration-none">
            Sign Up
          </NavLink>
        </p>

      </div>
    </div>
  );
};

export default Login;