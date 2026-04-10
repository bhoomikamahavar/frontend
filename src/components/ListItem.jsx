import React, { useEffect, useState } from "react";

const ListItem = () => {
  const [cart, setCart] = useState([]);

  // ✅ Load cart
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
  }, []);

  // ✅ Remove item
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cart.map((item) => (   // ✅ FIXED HERE
            <div key={item.id} className="col-md-4 col-12">
              <div className="card p-3 mb-2">
                <h5>{item.name}</h5>

                {item.image && (
                  <img src={item.image} width="100" alt="" />
                )}

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn btn-danger mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListItem;