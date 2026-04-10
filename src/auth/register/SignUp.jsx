import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:7777/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      if (res.status === 201) {
      alert("User registered successfully!");
      navigate("/login");
      } else {
        alert(data.message || "Register failed ❌");
      }



      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      alert(error.message || "Server error");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      
      <div className="card shadow-lg p-4 border-0" style={{ width: "400px", borderRadius: "15px" }}>
        
        <h2 className="text-center mb-4 fw-bold">Create Account</h2>

        <form onSubmit={handleSubmit}>
          
          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button type="submit" className="btn btn-dark w-100">
            Register
          </button>
        </form>

        {/* Extra */}
        <p className="text-center mt-3 small">
          Already have an account? <a href="/login">Login</a>
        </p>

      </div>
    </div>
  );
};

export default SignUp;