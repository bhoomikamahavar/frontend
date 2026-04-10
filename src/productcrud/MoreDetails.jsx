import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const MoreDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [single, setSingle] = useState({});
  const [loading, setLoading] = useState(true);

  // ✅ FETCH SINGLE PRODUCT
  const getSingleProduct = async () => {
    try {
      const res = await fetch(
        `http://localhost:7777/api/products/singleproduct/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (res.status === 401) {
        navigate("/login");
        return;
      }

      const data = await res.json();
      console.log("API Response:", data);

      // 🔥 IMPORTANT (handle both cases)
      if (data.product) {
        setSingle(data.product);
      } else {
        setSingle(data);
      }

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  // update product
  const updatetocart = (id) => {
    if (!single._id) {
      alert("Product not loaded yet!");
      return;
    }
  }

  // ✅ ADD TO CART FUNCTION
  const addtocart = () => {
    if (!single._id) {
      alert("Product not loaded yet!");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // 🔥 Prevent duplicate
    const existingItem = cart.find((item) => item.id === single._id);

    if (existingItem) {
      alert("Product already in cart!");
      return;
    }

    cart.push({
      id: single._id,
      name: single.name,
      rate: single.price,
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("Updated Cart:", cart);
    alert("Product added successfully");
  };

  // ✅ LOADING STATE
  if (loading) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <div className="container mt-4">
      <div className="row">

        {/* LEFT SIDE IMAGE */}
        <div className="col-md-8">
          <img
            src={single.image}
            className="img-fluid rounded"
            alt={single.name}
          />
        </div>

        {/* RIGHT SIDE DETAILS */}
        <div className="col-md-4">
          <h3>{single.name}</h3>
          <p>{single.description}</p>

          <input
            type="number"
            placeholder="Quantity"
            className="form-control mb-3"
          />

          <button
            onClick={addtocart}
            className="btn btn-primary w-100 mb-2"
            disabled={!single._id}
          >
            Add to Cart
            </button>
            <Link
              to={`/updateproduct/${single._id}`}
              className="btn btn-warning ms-2"
            >
              Update
            </Link>
        </div>

      </div>
    </div>
  );
};

export default MoreDetails;