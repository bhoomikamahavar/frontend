import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
    quantity: "",
    rating: "",
  });

  const [loading, setLoading] = useState(true);

  // ✅ FETCH SINGLE PRODUCT
  const getSingleProduct = async () => {
    try {
      const res = await fetch(
        `http://localhost:7777/api/products/singleproduct/${id}`,
        {
          credentials: "include",
        }
      );

      if (res.status === 401) {
        navigate("/login");
        return;
      }

      const data = await res.json();
      const product = data.product || data;

      setFormData({
        name: product.name || "",
        price: product.price || "",
        image: product.image || "",
        description: product.description || "",
        category: product.category || "",
        quantity: product.quantity || "",
        rating: product.rating || "",
      });

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  // ✅ HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ UPDATE PRODUCT
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      rating: Number(formData.rating),
    };

    try {
      const res = await fetch(
        `http://localhost:7777/api/products/updateproduct/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Product updated successfully ✅");
        navigate("/getproducts");
      } else {
        alert(data.error || "Update failed ❌");
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  // ✅ LOADING
  if (loading) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Update Product</h2>

      <form onSubmit={handleUpdate}>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        {/* 🔥 Image Preview */}
        {formData.image && (
          <img
            src={formData.image}
            alt="preview"
            style={{ width: "120px", marginBottom: "10px" }}
          />
        )}

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          value={formData.rating}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />

        <button className="btn btn-warning w-100">
          Update Product
        </button>

      </form>
    </div>
  );
};

export default UpdateProduct;