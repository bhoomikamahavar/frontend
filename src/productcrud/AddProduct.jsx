import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "https://placehold.co/300x250/d3d3d3/111111?text=Product",
    description: "",
    category: "",
    quantity: "",
    rating: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      rating: Number(formData.rating),
    };

    try {
      const res = await fetch("http://localhost:7777/api/products/createproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(productData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Product created successfully ✅");

        setFormData({
          name: "",
          price: "",
          image: "https://placehold.co/300x250/d3d3d3/111111?text=Product",
          description: "",
          category: "",
          quantity: "",
          rating: "",
        });

        navigate("/getproducts");
      } else {
        alert(data.error || "Failed ❌");
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center py-5">
      
      <div className="card shadow-lg p-4 border-0" style={{ maxWidth: "700px", width: "100%", borderRadius: "15px" }}>
        
        <h3 className="text-center mb-4 fw-bold">Create Product</h3>

        <form onSubmit={handleSubmit}>
          <div className="row">

            {/* NAME */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Product Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* PRICE */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            {/* CATEGORY */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Category</label>
              <input
                type="text"
                name="category"
                className="form-control"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            {/* QUANTITY */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            {/* RATING */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Rating (1-5)</label>
              <input
                type="number"
                name="rating"
                className="form-control"
                value={formData.rating}
                onChange={handleChange}
                min={1}
                max={5}
                required
              />
            </div>

            {/* IMAGE */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Image URL</label>
              <input
                type="text"
                name="image"
                className="form-control"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div className="col-12 mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          {/* IMAGE PREVIEW 🔥 */}
          <div className="text-center mb-3">
            <img
              src={formData.image}
              alt="preview"
              style={{ width: "140px", borderRadius: "10px" }}
            />
          </div>

          {/* BUTTON */}
          <button className="btn btn-dark w-100 py-2 fw-semibold">
            Create Product
          </button>
        </form>

      </div>
    </div>
  );
};

export default CreateProduct;